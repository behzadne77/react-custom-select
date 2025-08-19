"use client";

import styles from "./page.module.css";
import MultiDropdown from "../components/MultiDropdown";
import { useState } from "react";

export default function Home() {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState<{label: string, value: string}[]>([
    {label: 'Education', value: 'education'},
    {label: 'Yeeeh, science!', value: 'science'},
    {label: 'Art', value: 'art'},
    {label: 'Sport', value: 'sport'},
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
