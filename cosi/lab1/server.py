#!/usr/bin/env python3
import http.server
import socketserver

PORT = 8000

SERVER_PATH = "127.0.0.1"

Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer((SERVER_PATH, PORT), Handler) as httpd:
    print("Serving at: ", SERVER_PATH, ":", PORT, sep="")
    httpd.serve_forever()
