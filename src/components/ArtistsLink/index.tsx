import React, { FC } from 'react';
import { Link } from 'umi';

interface Props {
  artists: Artists[];
  className?: string;
}

type Artists = {
  name: string;
  id: number;
  [props: string]: any;
};

const ArtistsLink: FC<Props> = ({ artists, className }) => {
  return (
    <>
      {artists.map((item, index) => {
        if (index !== artists.length - 1) {
          return (
            <React.Fragment key={item.id + index}>
              <Link to={`/artist?id=${item.id}`} className={className}>
                {item.name}
              </Link>
              /
            </React.Fragment>
          );
        } else {
          return (
            <Link to={`/artist?id=${item.id}`} key={item.id + index} className={className}>
              {item.name}
            </Link>
          );
        }
      })}
    </>
  );
};

export default ArtistsLink;
