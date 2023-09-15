import { ReactNode, useState } from 'react';

const SidebarLinkGroupProps= {
  children: ReactNode,
  activeCondition: '',
}

const SidebarLinkGroup = ({
  children,
  activeCondition,
}) => {
  const [open, setOpen] = useState(activeCondition);

  const handleClick = () => {
    setOpen(!open);
  };

  return <li>{children(handleClick, open)}</li>;
};

export default SidebarLinkGroup;
