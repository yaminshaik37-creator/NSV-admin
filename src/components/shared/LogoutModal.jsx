"use client";
import Link from 'next/link'
import Modal from '../UI/Modal';
import PrimaryBtn from '../UI/PrimaryBtn';
import SecondaryBtn from '../UI/SecondaryBtn';
import { useTranslation } from 'react-i18next';
const Logout = ({ open, setOpen }) => {

    const { t } = useTranslation()

    return (
        <>
            <Modal open={open} setOpen={setOpen} title={t('TITLE.LOGOUT')}>
                <hr className="border border-[#DFE2E2]" />
                <div>
                    <div className="absolute left-0 top-5 bottom-0 w-1 h-11 bg-[#A382E2] rounded-r-lg cursor-pointer"></div>
                    <div className='manrope-semibold-lg text-dark-gray text-left my-5'>You are about to log out. Do you want to continue?</div>
                    <div className="flex justify-end mt-8 w-full gap-4">
                        <SecondaryBtn type="button" className="w-full" title='CANCEL' onClick={() => setOpen(false)} />
                        <Link href={'/logout'} className='w-full'><PrimaryBtn type="submit" className="w-full" title='YES, LOGOUT' onClick={() => setOpen(false)} /></Link>
                    </div>
                </div>
            </Modal>
        </>
    )
}
export default Logout;