"use client";

import { useState, useEffect } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";

export default function InfiniteScrollWrapper({
    fetchData,      // async function that returns next page items
    renderItem,     // function to render each item
    pageSize = 10,  // default items per page
    threshold = 0.5 // how early to trigger load
}) {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [loading, setLoading] = useState(false);

    // Load first page
    useEffect(() => {
        loadMore();
    }, []);


    //       // Whenever filters change => reset pagination
    //   useEffect(() => {
    //     setItems([]);
    //     setPage(1);
    //     setHasNextPage(true);
    //   }, [filterKey]);

    //   // Fetch data when page changes or filter changes
    //   useEffect(() => {
    //     const load = async () => {
    //       if (!hasNextPage) return;
    //       setLoading(true);
    //       const newItems = await fetchData(page, filters);
    //       setItems((prev) => (page === 1 ? newItems : [...prev, ...newItems]));
    //       if (newItems.length < pageSize) setHasNextPage(false);
    //       setLoading(false);
    //     };
    //     load();
    //   }, [page, filterKey]);


    // Function to load more data
    const loadMore = async () => {
        if (loading || !hasNextPage) return;
        setLoading(true);

        const newItems = await fetchData({ skip: page });
        setItems((prev) => [...prev, ...newItems]);
        setPage((prev) => prev + 1);

        if (newItems.length < pageSize) setHasNextPage(false);
        setLoading(false);
    };

    // Hook to detect bottom visibility
    const [sentryRef] = useInfiniteScroll({
        loading,
        hasNextPage,
        onLoadMore: loadMore,
        rootMargin: `${threshold * 100}% 0px`,
        disabled: false,
    });

    return (
        <>
            {items.map((item, index) => renderItem(item, index))}

            {(loading && (
                <div className="text-center py-3 text-gray-500">Loading...</div>
            )) || null}

            {hasNextPage && <div ref={sentryRef} className="h-8" />}

            {!hasNextPage && (
                <div className="text-center text-gray-400 py-3">No more items</div>
            )}
        </>
    );
}
