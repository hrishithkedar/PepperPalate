const RecipeCard = ({ imgSrc, description, author, title, id, rating }) => {
    const url = `/recipes/${id}`;
    if (!imgSrc) {
        imgSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKsAAACUCAMAAADbGilT";
    }
    return (
        <a href={url} className="w-full h-full">
            <div className="box border border-[#f0e0e0] rounded-xl shadow-md flex flex-col bg-white hover:shadow-xl transition-all duration-300 w-full h-full">
                <img
                    className="w-full rounded-t-xl object-cover flex-shrink-0"
                    style={{ height: '160px' }}
                    src={imgSrc}
                    alt={title}
                />
                <div className="p-4 flex flex-col flex-1">
                    <div
                        className="font-bold text-base mb-1 text-gray-800"
                        style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                        }}
                    >
                        {title}
                    </div>
                    <p
                        className="text-sm text-gray-500 mb-3 leading-snug"
                        style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                        }}
                    >
                        {description}
                    </p>
                    <div className="flex justify-between items-center mt-auto">
                        <p className="text-xs text-gray-400 font-medium">By {author}</p>
                        {rating && (
                            <span className="text-xs text-[#fa1111] font-bold">★ {rating}</span>
                        )}
                    </div>
                </div>
            </div>
        </a>
    );
};

export default RecipeCard;