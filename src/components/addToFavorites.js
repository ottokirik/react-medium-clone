import classNames from 'classnames';
import { useFetch } from 'hooks/useFetch';

export const AddToFavorites = ({ isFavorited, favoritesCount, articleSlug }) => {
  const apiUrl = `/articles/${articleSlug}/favorite`;
  const [{ response }, doFetch] = useFetch(apiUrl);

  favoritesCount = response ? response.article.favoritesCount : favoritesCount;
  isFavorited = response ? response.article.favorited : isFavorited;

  const btnClasses = classNames({
    btn: true,
    'btn-sm': true,
    'btn-primary': isFavorited,
    'btn-outline-primary': !isFavorited,
  });

  const onClickHandler = (event) => {
    event.preventDefault();
    doFetch({
      method: isFavorited ? 'delete' : 'post',
    });
  };

  return (
    <button className={btnClasses} onClick={onClickHandler}>
      <i className="ion-heart" />
      <span>&nbsp; {favoritesCount}</span>
    </button>
  );
};
