import React from 'react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import BASE_URL from '../config';

const UserRecipeCard = ({ imgSrc, description, author, title, id, onDelete }) => {
    const url = `/recipes/${id}`;
    const updateUrl = `/recipes/${id}/update`;
    const { token } = useAuth();

    const OnDelete = async () => {
        const dltUrl = `${BASE_URL}/recipes/${id}`;
        const res = await fetch(dltUrl, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        const response = await res.json();
        if (response.error) {
            toast.error(response.error);
            return;
        }
        toast.success("Successfully Deleted Recipe");
        onDelete(id);
    };

    if (!imgSrc) {
        imgSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKsAAACUCAMAAADbGilT";
    }

    return (
        <div className="box card border-2 mt-8 mr-4 rounded-xl w-60 max-h-[410px] shadow-md flex flex-col pt-0 pb-0 hover:shadow-xl transition-shadow duration-300">
            <img className="w-full rounded-t-xl h-[142px] object-cover" src={imgSrc} alt={`${title} recipe`} />
            <div className="p-2 flex flex-col pb-0">
                <div className="title font-bold text-lg mr-2 mb-2">{title}</div>
                <p className="mb-2 text-gray-700">{description}</p>
                <div className="flex space-x-2 mb-2 mt-auto">
                    <a href={updateUrl}>
                        <button className="px-2 py-1 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition-colors duration-300">Update</button>
                    </a>
                    <button className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300" onClick={OnDelete}>Delete</button>
                    <a href={url}>
                        <button className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300">View</button>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default UserRecipeCard;