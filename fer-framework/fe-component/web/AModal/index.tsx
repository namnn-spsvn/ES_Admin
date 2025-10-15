import React, { memo, useMemo } from "react";
import { Modal, ModalProps } from "antd";
import { createStyles } from "antd-style";

interface Props extends ModalProps {
  fullHeight?: boolean;
}

const AModal: React.FC<Props> = (props) => {
  const { children, className, fullHeight, ...restProps } = props;
  const { styles, cx } = useStyles();

  const bodyStyle = useMemo(() => {
    if (fullHeight) {
      return { height: "calc(100vh - 180px)" };
    }
    return {};
  }, [fullHeight]);
  return (
    <Modal
      className={cx(`${styles.container} ${className}`)}
      styles={{
        body: {
          maxHeight: "calc(100vh - 180px)",
          maxWidth: "calc(100vw - 180px)",
          overflowY: "auto",
          overflowX: "hidden",
          paddingRight: "16px",
          ...bodyStyle,
        },
      }}
      centered
      {...restProps}>
      {children}
    </Modal>
  );
};

export default memo(AModal);

const useStyles = createStyles(({ token, css }) => ({
  container: css`
    & .ant-modal-content {
      padding: 20px 8px 20px 24px;
    }
    & .ant-modal-footer {
      padding-right: 16px;
    }
  `,
}));
