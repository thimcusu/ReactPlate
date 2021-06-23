import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Container } from 'reactstrap';
import { List, InfiniteLoader, AutoSizer } from 'react-virtualized';

import useFetchPosts from '../api/useFetchPosts';
import Post from './Post';
import { api } from '../api/axiosService';

function FeedRecommend() {
  const [list, setList] = useState([]);
  const [count, setCount] = useState(10);
  const [rowCount, setRowCount] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

  const hasNext = useMemo(() => {
    return count > list.length;
  }, [count, list]);

  const isRowLoaded = useCallback(
    ({ index }) => {
      return !!list[index];
    },
    [list]
  );
  const loadMoreRows = ({ startIndex, stopIndex }) => {
    console.log(123);
    console.log(startIndex, stopIndex);
    const batchSize = stopIndex - startIndex;
    const offset = stopIndex;
    if (batchSize === 0 || offset === 0) {
      return;
    }
    setIsLoading(true);
    return api({
      url: 'posts',
      method: 'GET',
    }).then((res) => {
      const result = res.data.slice(startIndex, startIndex + 10);
      setIsLoading(false);
      setList([...list, ...result]);
    });
  };
  /** If there are more items to be loaded then add an extra row to hold a loading indicator. */
  useEffect(() => {
    setRowCount(hasNext ? list.length + 1 : list.length);
  }, [hasNext, list, setRowCount]);

  const rowRenderer = useCallback(
    ({ key, index, style }) => {
      if (!isRowLoaded({ index })) {
        return <div>Loading...</div>;
      } else {
        console.log(index);
        return <Post key={key} post={list[index]} style={style} />;
      }
    },
    [list, isRowLoaded]
  );
  return (
    <Container className="post-container">
      <InfiniteLoader
        isRowLoaded={isRowLoaded}
        loadMoreRows={loadMoreRows}
        rowCount={10}
        threshold={10}
      >
        {({ onRowsRendered, registerChild }) => (
          //   <AutoSizer disableHeight>
          //     {({ width }) => (
          <List
            height={50000}
            onRowsRendered={onRowsRendered}
            ref={registerChild}
            rowCount={rowCount}
            rowHeight={50000}
            rowRenderer={rowRenderer}
            width={700}
          />
          // )}
        )}
      </InfiniteLoader>
    </Container>
  );
}

export default FeedRecommend;
