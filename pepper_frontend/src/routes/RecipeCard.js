const RecipeCard = ({ imgSrc, description,author,title,id }) => {
    const url=`/recipes/${id}`
    if(imgSrc===""){
        imgSrc="data:image/png;base64,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"
    }
    return (
        <a href={url}>
            <div className="box card border-2 mt-8 mr-4 rounded-xl  w-56 max-h-[336px] shadow-md flex flex-col pt-0 pb-0">
            <img className="w-full rounded-t-xl h-[142px]" src={imgSrc} />
            <div className="p-4 flex flex-col  pb-0">
                <div className="title font-bold text-lg mr-2 mb-2">
                    {title}
                </div>
                <p className="mb-4">{description}</p>
                <p className="text-sm text-[#757573] ml-auto font-medium">By {author}</p>
            </div>
            

        </div>
        </a>
        

    )
}

export default RecipeCard;