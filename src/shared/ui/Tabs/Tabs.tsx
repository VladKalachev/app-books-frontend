import { Tab } from "@headlessui/react";
import { ReactNode, Fragment } from "react";
import { classNames } from "@/shared/libs/classNames/classNames";
import cls from "./Tabs.module.scss";

export interface TabItem {
  key: number;
  title: string;
  content: ReactNode;
}

interface TabsProps {
  className?: string;
  tabs: TabItem[];
  value: number;
  onTabClick: (index: number) => void;
}

export const Tabs = (props: TabsProps) => {
  const { tabs, value, onTabClick, className } = props;

  return (
    <>
      <Tab.Group selectedIndex={value} onChange={onTabClick}>
        <div className={classNames(cls.Tabs, {}, [className])}>
          {tabs.map((tab) => (
            <Tab.List key={tab.key}>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <div className={selected ? cls.selected : cls.item}>
                    {tab.title}
                  </div>
                )}
              </Tab>
            </Tab.List>
          ))}
        </div>

        {tabs.map((tab) => (
          <Tab.Panels key={tab.key}>
            <Tab.Panel>{tab.content}</Tab.Panel>
          </Tab.Panels>
        ))}
      </Tab.Group>
    </>
  );
};
