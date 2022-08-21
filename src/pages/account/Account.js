import React, { Fragment, useEffect, useState } from "react";
import { getNFT } from "../../services/nft-services";
import useAppContext from "../../hooks/useAppContext";
import NFTCard from "../../components/NFTCard";

const Account = () => {
  const [isLoadingState, setIsLoadingState] = useState(true);
  const [errorstate, setErrorState] = useState(null);
  const [nftMetadata, setNftMetadata] = useState({
    name: null,
    image: null,
    description: null,
  });
  const { address } = useAppContext();
  useEffect(() => {
    getNFT(address)
      .then((res) => {
        const nftData = res.data;
        console.log(nftData);
        setNftMetadata(nftData);
        setIsLoadingState(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoadingState(false);
        setErrorState("An error occurred, please try again");
      });
  }, [address]);

  return (
    <Fragment>
      <h2>Account</h2>
      <div className="uk-width-1-1">
        <div className="uk-width-1-2">
          <NFTCard {...nftMetadata} />
        </div>
        <div className="uk-width-1-2"></div>
      </div>
    </Fragment>
  );
};

export default Account;
