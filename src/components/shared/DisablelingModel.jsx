"use client";
import Link from 'next/link'
import Modal from '../UI/Modal';
import PrimaryBtn from '../UI/PrimaryBtn';
import SecondaryBtn from '../UI/SecondaryBtn';
import { useTranslation } from 'react-i18next';

const Disable = ({ open, setOpen, onConfirm, action }) => {

  const { t } = useTranslation()

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <Modal open={open} setOpen={setOpen} title={t('TITLE.CONFIRM_DISABLE')}>
      <div className='my-6'>
        <div className='mb-5 text-lg text-start'>{t('LABEL.DISABLE_CONFIRM')} {action === 'disable' ? 'disable' : 'enable'} {t('LABEL.FROM_INVENTORY')}</div>
        <div className="flex justify-end mt-8">
          <PrimaryBtn type="submit"  title={t('BUTTON.OKAY')} onClick={handleConfirm}/>
          <SecondaryBtn type="button" className="ml-4" title={t('BUTTON.CANCEL')} onClick={() => setOpen(false)} />
        </div>
      </div>
    </Modal>
  );
};

export default Disable;
