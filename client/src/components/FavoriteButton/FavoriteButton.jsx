import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import usePost from "../../hooks/usePost";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";

export const FavoriteButton = ({ store }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const { data, loading } = useFetch(
    `user/isfavorite?storeId=${store.storeId}`
  );

  const favorite = usePost("user/favorite");
  const unfavorite = usePost("user/unfavorite");

  useEffect(() => {
    if (data) {
      setIsFavorite(data.isFavorite ?? false);
    }
  }, [data, loading, store]);

  return (
    <Checkbox
      disabled={loading}
      checked={isFavorite}
      icon={<FavoriteBorder />}
      checkedIcon={<Favorite sx={{ color: "red" }} />}
      onChange={(_event, checked) => {
        setIsFavorite(checked);
        checked
          ? favorite.postData({
              storeId: store.storeId,
              name: store.name,
              image: store.images?.length ? store.images[0] : null,
              location: store.location,
            })
          : unfavorite.postData({ storeId: store.storeId });
      }}
      sx={{ mt: "-10px", width: "10%" }}
    />
  );
};
