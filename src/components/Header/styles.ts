import styled from "styled-components";

export const Container = styled.div`
  background: #131416;
  padding: 55px 0;

  header {
    width: 1280px;
    margin: 0 auto;
    padding: 0 0 160px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
      font-weight: 600;
      border-radius: 8px;
      border: 0;
      background: ${({ theme }) => theme.colors.primary};
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
        background: ${({ theme }) => theme.colors.primary};
        border-radius: 8px;
        /* border-top-left-radius: 0;
        border-bottom-left-radius: 0; */
        margin: 0 auto;
        filter: brightness(0.75);
      }
    }
  }

  button {
    .icon {
      font-weight: 600;
      border-radius: 8px;
      border: 0;
      background: ${({ theme }) => theme.colors.primary};
      color: #fff;

      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
`;
