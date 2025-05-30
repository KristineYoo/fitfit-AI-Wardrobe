## FitFit

 FitFit is a website that uses artificial intelligence to recommend daily outfits straight from what clothes you have in your wardrobe
 You are able to sign in/ log in 
 Upload clothing items and pictures
 View, edit, and delete clothing items
 Use a recommendation system to get personalized outfits

##  Installation Guide

Follow the steps below to set up the project on your local machine.

---

###  Clone the Repository

First, clone the project using SSH:

    git clone git@gitlab.cci.drexel.edu:cid/2425/ws1023/65/01/fitfit.git
    cd fitfit

---

### ️ Backend Setup

####  Requirements
Make sure the following are installed:
- Python (latest stable version recommended)
- pip (Python package manager)
- venv (virtual environment module)
- Git

---

####  Navigate to the Backend Directory

If you're in the root of the project:

    cd backend

If you're inside the frontend folder:

    cd ../backend

Make sure that your current working directory is now `fitfit/backend`, **not** `fitfit` or `fitfit/frontend`.

---

####  Create and Activate a Virtual Environment

On Windows:

    python -m venv venv
    venv\Scripts\activate

On Windows (using Git Bash):

    python -m venv venv
    source venv/Scripts/activate

On macOS/Linux:

    python -m venv venv
    source venv/bin/activate

---

####  Install Dependencies

With the virtual environment activated, install the required Python packages:

    pip install -r requirements.txt

---

####  Start the Backend Server

To run the backend server:

    python app.py

This will start the backend, usually at `http://localhost:5000`.

---

###  Frontend Setup

1. Open a new terminal tab or window.
2. Navigate to the frontend directory:

       cd frontend

3. Start the frontend development server:

       npm run dev

## Usage
### Basic Flow

1. **Sign Up / Log In**  
   Create an account or log in.

2. **Input Preferences**  
   Enter style preferences, occasion, weather, or mood.

3. **View Recommendations**  
   Get personalized outfit suggestions instantly.

## Support
For support or trouble shooting email bgv25@drexel.edu, irg35@drexel.edu, ss5837@drexel.edu, or kly35@drexel.edu 

## Contributing

- All contributions must go through a **merge request (MR)**.
- Each MR must be reviewed and approved by **at least one of the four original project creators** before being merged.
- Make sure your code is clean, readable, and well-documented.
- Ensure the virtual environment **is** activated **before** installing **new** dependencies.
- Run `pip freeze > requirements.txt` **after** adding **new** dependencies.


## Authors and acknowledgment
Bao Vuong,
Sophia Somers,
Iain Gore,
Kristine Yoo

