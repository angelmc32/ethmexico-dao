import styled from "styled-components";

const Loader = () => {
  return (
    <StyledDiv className="uk-flex uk-flex-column uk-flex-middle uk-margin-top">
      <div uk-spinner="ratio: 1" />
      <div className="loader uk-margin">Cargando</div>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  .loader::after {
    display: inline-block;
    animation: dotty steps(1, end) 2s infinite;
    content: "";
  }

  @keyframes dotty {
    0% {
      content: "";
    }
    25% {
      content: ".";
    }
    50% {
      content: "..";
    }
    75% {
      content: "...";
    }
    100% {
      content: "";
    }
  }
`;

export default Loader;
