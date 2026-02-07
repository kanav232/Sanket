# **App Name**: SamridhiWatch

## Core Features:

- Social Media Ingestion: Continuously ingest public Threads posts based on configured keywords and geographic filters using Firebase Cloud Functions.
- AI-Based Intent Classification: Use an LLM as a tool to classify emergency situations from social media content and determine severity.
- Multimodal Verification: Validate visual evidence in social media posts related to incidents.
- Geoparsing and Clustering: Extract location references and cluster posts into master incidents using spatial and temporal thresholds. Store this data in Firestore.
- Digital Emergency Ticket Generation: Automatically generate emergency tickets with GPS coordinates, incident type, and AI confidence scores; store in Firestore.
- Command Center Dashboard: Display a real-time interactive map of active incidents color-coded by severity.
- Role-Based Access Control: Implement role-based access using Firebase Authentication (Administrator, Authority User, Read-Only Viewer) with appropriate data access permissions.

## Style Guidelines:

- Primary color: Deep green (#1E8449) symbolizing safety and growth.
- Background color: Light green (#E8F5E9), a gentle variation of the primary.
- Accent color: Blue (#2980B9) for actionable elements, conveying trust and authority.
- Body and headline font: 'PT Sans' for readability and a modern look.
- Use clear and informative icons representing incident types and severity levels.
- Design a clean, map-centric layout with intuitive controls for filtering and incident selection.
- Employ smooth transitions and loading animations to enhance user experience.