#!/usr/bin/env python3
import uvicorn
import os
import sys

# Ensure current dir is in PYTHONPATH
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8001))
    print(f"🚀 Starting EduPulse Multi-Tenant Backend on http://127.0.0.1:{port}")
    print(f"📚 Swagger Interactive Docs at http://127.0.0.1:{port}/docs")
    uvicorn.run("app.main:app", host="0.0.0.0", port=port, reload=False)
