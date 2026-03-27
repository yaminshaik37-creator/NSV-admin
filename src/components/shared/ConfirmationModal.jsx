import Modal from "../UI/Modal"

const ConfirmationModal = ({ open, setOpen, cb, title, message }) => {
    return (
        <>
            <Modal open={open} setOpen={setOpen} isConfirmationModal={true} cb={cb} title={title} >
                <div className='manrope-semibold-lg text-dark-gray text-left mt-5'>{message}</div>
            </Modal>
        </>
    )
}

export default ConfirmationModal