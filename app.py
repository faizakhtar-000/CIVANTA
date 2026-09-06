import os
import folium
import networkx as nx
import osmnx as osm
import pandas as pd
import streamlit as st
from streamlit_folium import st_folium

# ---------------------------------------------------------
# 1. PAGE CONFIG & HEADER
# ---------------------------------------------------------
st.set_page_config(
    page_title="NER AI Logistics Routing System",
    page_icon="🚚",
    layout="wide"
)

osm.settings.user_agent = "ner_sih_routing_app_v1"

st.title("🚚 AI-Enabled Risk-Aware Routing System for NER")
st.markdown("""
*Addressing logistics disruptions in North-East India by dynamically avoiding high-risk, landslide-prone, and flooded corridors.*
""")

# ---------------------------------------------------------
# 2. DATA LOADING & PREPROCESSING
# ---------------------------------------------------------
@st.cache_data
def load_risk_data(csv_path="road_risk_scores.csv"):
    if not os.path.exists(csv_path):
        st.error(f"Dataset '{csv_path}' not found! Please place it in the same directory.")
        return {}
    
    df = pd.read_csv(csv_path)
    risk_dict = df.set_index('road_id').to_dict(orient='index')
    return risk_dict

risk_lookup = load_risk_data()

# ---------------------------------------------------------
# 3. ROUTE GRAPH CREATION USING COORDINATES
# ---------------------------------------------------------
@st.cache_resource
def load_road_network_by_coords(lat, lon, dist=3000):
    G = osm.graph_from_point((lat, lon), dist=dist, network_type='drive')
    return G

def apply_risk_weights(G, risk_data, alpha=0.05, beta=10.0):
    G_weighted = G.copy()
    
    for u, v, k, data in G_weighted.edges(keys=True, data=True):
        osmid = data.get('osmid')
        
        if isinstance(osmid, list):
            way_ids = [f"way/{id_val}" for id_val in osmid]
        else:
            way_ids = [f"way/{osmid}"] if osmid else []
            
        r_score = 0.0
        p_disruption = 0
        
        for way_id in way_ids:
            if way_id in risk_data:
                r_score = max(r_score, risk_data[way_id]['risk_score'])
                p_disruption = max(p_disruption, risk_data[way_id]['predicted_disruption'])
                
        length = data.get('length', 1.0)
        
        risk_penalty = 1 + (alpha * r_score) + (beta * p_disruption)
        data['risk_cost'] = length * risk_penalty
        data['risk_score_val'] = r_score
        data['is_disrupted'] = p_disruption
        
    return G_weighted

# ---------------------------------------------------------
# 4. SIDEBAR CONTROLS
# ---------------------------------------------------------
# ---------------------------------------------------------
# 4. SIDEBAR CONTROLS & ANY-LOCATION SELECTOR
# ---------------------------------------------------------
from geopy.geocoders import Nominatim

st.sidebar.header("⚙️ Routing & Model Parameters")

st.sidebar.subheader("Risk Weight Tuning")
alpha = st.sidebar.slider("Risk Score Penalty Multiplier (α)", 0.0, 0.2, 0.05, step=0.01)
beta = st.sidebar.slider("Disruption Avoidance Penalty (β)", 1.0, 50.0, 15.0, step=1.0)

st.sidebar.markdown("---")
st.sidebar.subheader("📍 Location Selector")

# Option 1: Quick Presets
CITY_PRESETS = {
    "Guwahati, Assam": (26.1445, 91.7362),
    "Shillong, Meghalaya": (25.5788, 91.8933),
    "Silchar, Assam": (24.8333, 92.7789),
    "Dimapur, Nagaland": (25.9060, 93.7271),
    "Itanagar, Arunachal Pradesh": (27.0844, 93.6053),
    "Custom Search / Coordinates": None
}

selected_preset = st.sidebar.selectbox("Select Quick Region Preset", list(CITY_PRESETS.keys()))

# Option 2: Custom Text Search (Geocoding)
search_place = st.sidebar.text_input("Or Type Any City/Place Name", value="")

# Default coordinates fallback (Guwahati)
default_lat, default_lon = 26.1445, 91.7362

if search_place.strip():
    geolocator = Nominatim(user_agent="ner_sih_routing_app_v1")
    try:
        location = geolocator.geocode(search_place)
        if location:
            default_lat, default_lon = location.latitude, location.longitude
            st.sidebar.success(f"Found: {location.address[:35]}...")
        else:
            st.sidebar.warning("Location not found. Using default coordinates.")
    except Exception:
        st.sidebar.warning("Geocoding service busy. Using default coordinates.")
elif CITY_PRESETS[selected_preset] is not None:
    default_lat, default_lon = CITY_PRESETS[selected_preset]

# Manual Fine-Tuning Coordinates
st.sidebar.markdown("**Route Coordinates:**")
start_lat = st.sidebar.number_input("Start Latitude", value=float(default_lat), format="%.4f")
start_lon = st.sidebar.number_input("Start Longitude", value=float(default_lon), format="%.4f")

# Offsets end location slightly by default to generate a demo route
end_lat = st.sidebar.number_input("End Latitude", value=float(default_lat + 0.0155), format="%.4f")
end_lon = st.sidebar.number_input("End Longitude", value=float(default_lon + 0.0138), format="%.4f")

# Adjust search coverage radius
search_radius = st.sidebar.slider("Road Network Coverage Radius (meters)", 1000, 10000, 3500, step=500)

with st.spinner("Downloading road network graph for selected location..."):
    G_raw = load_road_network_by_coords(start_lat, start_lon, dist=search_radius)
    G = apply_risk_weights(G_raw, risk_lookup, alpha, beta)

# ---------------------------------------------------------
# 5. ROUTING ENGINE CALCULATION
# ---------------------------------------------------------
orig_node = osm.distance.nearest_nodes(G, X=start_lon, Y=start_lat)
dest_node = osm.distance.nearest_nodes(G, X=end_lon, Y=end_lat)

std_route = nx.shortest_path(G, orig_node, dest_node, weight='length')
std_distance = sum(G[u][v][0]['length'] for u, v in zip(std_route[:-1], std_route[1:])) / 1000.0

risk_route = nx.shortest_path(G, orig_node, dest_node, weight='risk_cost')
risk_distance = sum(G[u][v][0]['length'] for u, v in zip(risk_route[:-1], risk_route[1:])) / 1000.0

def calc_route_risk(G_graph, path):
    total_risk = 0
    disruptions = 0
    for u, v in zip(path[:-1], path[1:]):
        edge_data = G_graph[u][v][0]
        total_risk += edge_data.get('risk_score_val', 0)
        disruptions += edge_data.get('is_disrupted', 0)
    avg_risk = total_risk / len(path) if len(path) > 0 else 0
    return avg_risk, disruptions

std_avg_risk, std_disruptions = calc_route_risk(G, std_route)
risk_avg_risk, risk_disruptions = calc_route_risk(G, risk_route)

# ---------------------------------------------------------
# 6. DASHBOARD METRICS DISPLAY
# ---------------------------------------------------------
col1, col2, col3, col4 = st.columns(4)
col1.metric("Standard Path Distance", f"{std_distance:.2f} km")
col2.metric("Safe Path Distance", f"{risk_distance:.2f} km", delta=f"{risk_distance - std_distance:.2f} km")
col3.metric("Standard Path Avg Risk", f"{std_avg_risk:.1f}", delta=f"{std_avg_risk - risk_avg_risk:.1f}", delta_color="inverse")
col4.metric("Disrupted Edges Avoided", f"{std_disruptions - risk_disruptions} Blockages")

# ---------------------------------------------------------
# 7. MAP VISUALIZATION WITH TILE CONTROL
# ---------------------------------------------------------
# Base layer: Free OpenStreetMap
m = folium.Map(location=[start_lat, start_lon], zoom_start=13, tiles="OpenStreetMap")

# Add Satellite Layer (Esri World Imagery)
folium.TileLayer(
    tiles="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attr="Esri World Imagery",
    name="Satellite View"
).add_to(m)

# Add Layer Control toggle box at top-right
folium.LayerControl().add_to(m)

# Standard Route (Red Line)
std_coords = [(G.nodes[n]['y'], G.nodes[n]['x']) for n in std_route]
folium.PolyLine(
    std_coords, 
    color="red", 
    weight=5, 
    opacity=0.6, 
    tooltip="Standard Route (Unsafe Path)"
).add_to(m)

# AI Risk-Aware Route (Green Line)
risk_coords = [(G.nodes[n]['y'], G.nodes[n]['x']) for n in risk_route]
folium.PolyLine(
    risk_coords, 
    color="green", 
    weight=6, 
    opacity=0.9, 
    tooltip="AI Safe Route (Risk-Optimized)"
).add_to(m)

folium.Marker([start_lat, start_lon], popup="Origin", icon=folium.Icon(color="blue", icon="play")).add_to(m)
folium.Marker([end_lat, end_lon], popup="Destination", icon=folium.Icon(color="black", icon="flag")).add_to(m)

st_folium(m, width=1100, height=550)