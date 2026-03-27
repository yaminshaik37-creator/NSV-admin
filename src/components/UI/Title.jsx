
const Title = ({ title, className, id }) => {
    return (
        <>
            <h3 id={id} className={`${className ? className : "manrope-bold-2xl text-dark-gray"}`}>{title}</h3>
        </>
    )
}

export default Title