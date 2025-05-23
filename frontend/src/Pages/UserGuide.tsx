import React from 'react';

const UserGuide: React.FC = () => {
    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-2xl space-y-6">
            <h1 className="text-3xl font-bold text-center">👕 Welcome to FitFit 👕</h1>

            <section>
                <h2 className="text-xl font-semibold">1. Upload Your Wardrobe</h2>
                <p className="text-gray-700">
                    The "Wardrobe" page maintains all your clothing items
                </p>
                <p className="directionUpload2">
                    To upload a clothing item to your online wardrobe, click the + icon on the bottom right of your screen.
                    Simply upload a picture and fill out the description of your clothing item.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-semibold">2. Editing and Deleting</h2>
                <p className="text-gray-700">
                    To edit an already existing item, simply click the green edit button. A form will appear to facilitate any changes you want to make.
                </p>
                <p className="text-gray-700">
                    To delete an item either use the pink - button on the bottom left, select which item to delete, and press "ok".
                </p>
                <p className="text-gray-700">
                    You can also press the pink - button on the top right. A confirmation form will appear. If you do not want to delete the item, press "Cancel" or press "Delete" if you do.
                </p>


            </section>

            <section>
                <h2 className="text-xl font-semibold">3. Get Daily Suggestions</h2>
                <p className="text-gray-700">
                    Navigate to the "Style Recommend" tab to receive outfit ideas based on your wardrobe, weather, and occasion. Each suggestion is unique and practical.
                </p>
                <p className="text-gray-700">
                    Simply type a prompt(or a description of the outfit you want to make).
                </p>
                <p className="text-gray-700">
                    If you are using a Mac, press the Return Button.
                    If you have a Windows OS, press the Enter Button.
                </p>
            </section>




        </div>
    );
};

export default UserGuide;
