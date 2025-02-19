# Backend Setup Guide

This is a guide to help you set up the backend for development while working on the frontend.

## Prerequisites

- Python (Recommended: latest stable version)
- pip (Python package manager)
- Virtual environment module (`venv`)
- A working installation of `git`

## Setup Instructions

1. **Change working directory to backend**

Run this command if your working directory is .../fitfit:
```
cd backend
```

Run this command if you working directory is .../fitfit/frontend
```
cd ../backend
```

After running the command, make sure that your working directory is .../fitfit/backend, **not** .../fitfit or .../fitfit/frontend

2. **Create and activate a virtual environment**
- On Windows:
    ```
    python -m venv venv
    venv\Scripts\activate
    ```
- On Windows but using Git Bash:
    ```
    python -m venv venv
    source venv/Scripts/activate
    ```
- On macOS/Linux:
    ```
    python -m venv venv
    source venv/bin/activate
    ```

3. **Install dependencies**
```
pip install -r requirements.txt
```

4. **Run the backend server**
```
python app.py
```
The server should now be running at `http://127.0.0.1:5000/`.

## Common Issues & Fixes

- **"venv\Scripts\activate: command not found"**
Ensure you're running the command in the correct directory and using the correct command for your OS.

## Contributing

- Ensure the virtual environment **is** activated **before** installing **new** dependencies.
- Run `pip freeze > requirements.txt` **after** adding **new** dependencies.