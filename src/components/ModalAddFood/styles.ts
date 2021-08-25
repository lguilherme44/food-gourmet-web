import styled from "styled-components";

export const Form = styled.form`
  padding: 48px 40px;
  display: flex;
  flex-direction: column;

  input,
  textarea {
    flex: 1;
    background: transparent;
    border: 0;
    color: #b7b7cc;
    padding: 15px;
    background: #fff;
    border-radius: 8px;
    margin-top: 24px;
    font-size: 1rem;

    &::placeholder {
      color: #b7b7cc;
    }
  }

  h1 {
    margin-bottom: 40px;
    font-weight: 600;
    font-size: 36px;
    line-height: 36px;
  }

  button {
    margin-top: 48px;
    align-self: flex-end;
  }

  button {
    font-weight: 600;
    border-radius: 8px;
    border: 0;
    background: rgb(155, 197, 61);
    color: #fff;

    display: flex;
    flex-direction: row;
    align-items: center;

    .text {
      padding: 16px 24px;
    }

    .icon {
      display: flex;
      padding: 16px 16px;
      background: rgb(155, 190, 61);
      border-radius: 0 8px 8px 0;
      margin: 0 auto;
    }
  }
`;
