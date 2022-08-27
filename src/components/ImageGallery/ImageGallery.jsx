import React from 'react';
import PropTypes from 'prop-types';

// import classNames from 'classnames';

// import 'components/ContactList/ContactList.css';
import css from 'components/ImageGallery/ImageGallery.module.css' //todo = старый вариант импорта стилей




export const ImageGallery = ({ hits }) => (
        <ul className={css.ImageGallery}>
          {hits.map(({ id, webformatURL, largeImageURL }) => (
            <li
              key={id}
              // className="gallery-item"
              className={css.ImageGalleryItem}
            >
              <img
                className={css.ImageGalleryItemImage}
                src={webformatURL}
                alt=""
              />
          </li>
          ))}
        </ul>
);


ImageGallery.propTypes = {
  hits: PropTypes.array.isRequired,
  
};



// export default Filter;
