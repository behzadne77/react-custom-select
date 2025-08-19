"use client";

import styles from "./page.module.css";
import MultiDropdown from "../components/MultiDropdown";
import { useState } from "react";

export default function Home() {
  const [value, setValue] = useState('');
  const [options] = useState<{label: string, icon?: string, value: string}[]>([
    {label: 'Education', value: 'education', icon: '/images/mortarboard.png'},
    {label: 'Yeeeh, science!', value: 'science', icon: '/images/science.png'},
    {label: 'Art', value: 'art', icon: '/images/palette.png'},
    {label: 'Sport', value: 'sport', icon: '/images/sports.png'},
    {label: 'Games', value: 'games'},
    {label: 'Health', value: 'health'}
  ]);
  const handleChange = (value: string) => {
    setValue(value);
  }
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <MultiDropdown options={options} onChange={handleChange} value={value} placeholder="Multi Dropdown Component" />
      </main>
    </div>
  );
}
