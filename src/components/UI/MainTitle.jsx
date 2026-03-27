
const MainTitle = ({ title, className, id }) => {
    return (
        <>
            <h3 id={id} className={`lora-bold-2xl text-dark-gray ${className}`}>{title}</h3>
        </>
    )
}

export default MainTitle