import ReactPaginate from 'react-paginate';
import { useTranslation } from 'react-i18next';

const Pagination = ({ count, size, handlePageChange, page }) => {

    const { t } = useTranslation()

    return (
        <div className="flex flex-col md:flex-row justify-between md:items-center mt-6 gap-4 mx-1">
            <ReactPaginate
                previousLabel={t('LABEL.PREVIOUS')}
                nextLabel={t('LABEL.NEXT')}
                breakLabel="..."
                breakClassName="break-me"
                pageCount={Math.ceil(count / size)}
                marginPagesDisplayed={1}
                pageRangeDisplayed={3}
                onPageChange={handlePageChange}
                containerClassName="pagination"
                activeClassName="active"
                forcePage={page}
                pageLinkClassName="cursor-pointer block appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-blue-500 manrope-regular-md"
                previousClassName="cursor-pointer manrope-regular-md text-dark-gray"
                nextClassName="cursor-pointer manrope-regular-md text-dark-gray"
            />
            <p className='text-dark-gray manrope-bold-md'>{t('TAGS.TOTAL_RECORDS')} {count}</p>
        </div>
    )
}

export default Pagination;