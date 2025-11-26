#!/bin/bash
cd /home/runner/${REPL_SLUG}/backend
uvicorn server:app --host localhost --port 8000 --reload
