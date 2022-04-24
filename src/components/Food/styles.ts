import styled, { css } from "styled-components";

interface ContainerProps {
  available: boolean;
}

export const Container = styled.div`
  background: transparent;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.02),
    0 6.7px 5.3px rgba(0, 0, 0, 0.028), 0 12.5px 10px rgba(0, 0, 0, 0.035),
    0 22.3px 17.9px rgba(0, 0, 0, 0.042), 0 41.8px 33.4px rgba(0, 0, 0, 0.05),
    0 100px 80px rgba(0, 0, 0, 0.07);
  border-radius: 20% 20% 0 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  header {
    background: transparent;
    max-height: 200px;
    overflow: hidden;
    transition: 0.3s opacity;
    text-align: center;

    /* ${(props: ContainerProps) =>
      !props.available &&
      css`
        opacity: 0.3;
      `}; */

    img {
      pointer-events: none;
      user-select: none;
      width: 100%;
      height: 100%;
      border-radius: 5% 5% 0 0;
    }
  }

  section.body {
    padding: 30px;

    h2 {
      color: #3d3d4d;
    }

    p {
      color: #3d3d4d;

      margin-top: 16px;
    }

    .price {
      font-style: normal;
      font-size: 24px;
      line-height: 34px;
      color: #81a532;

      b {
        font-weight: 600;
      }
    }
  }

  section.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 20px 30px;
    background: #e4e4eb;

    div.icon-container {
      display: flex;

      button {
        background: #fff;
        padding: 10px;
        border-radius: 8px;
        display: flex;
        border: none;
        transition: 0.1s;

        svg {
          color: #3d3d4d;
        }

        & + button {
          margin-left: 6px;
        }
      }
    }

    div.availability-container {
      display: flex;
      align-items: center;

      p {
        color: #3d3d4d;
      }

      .switch {
        position: relative;
        display: inline-block;
        width: 88px;
        height: 32px;
        margin-left: 12px;

        & input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #c72828;
          -webkit-transition: 0.4s;
          transition: 0.4s;
          border-radius: 16px;

          &:before {
            position: absolute;
            content: "";
            height: 20px;
            width: 40px;
            left: 8px;
            bottom: 6px;
            background-color: white;
            -webkit-transition: 0.4s;
            transition: 0.4s;
            border-radius: 10px;
          }
        }

        input:checked + .slider {
          background-color: #81a532;
        }

        input:focus + .slider {
          box-shadow: 0 0 1px #2196f3;
        }

        input:checked + .slider:before {
          -webkit-transform: translateX(32px);
          -ms-transform: translateX(32px);
          transform: translateX(32px);
        }
      }
    }
  }
`;
