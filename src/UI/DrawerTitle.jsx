
const DrawerTitle = ({ title, className, id }) => {
    return (
        <>
            <h3 id={id} className={`manrope-bold-xl text-dark-gray ${className}`}>{title}</h3>
        </>
    )
}

export default DrawerTitle