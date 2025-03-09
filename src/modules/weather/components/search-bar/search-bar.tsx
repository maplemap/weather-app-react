import React, { useState } from 'react';
import classNames from 'classnames';
import { Button } from '@/ui-kit/button';
import { CloseIcon, SearchIcon } from '@/ui-kit/icons';
import { Input } from '@/ui-kit/input';
import styles from './search-bar.module.scss';

enum KEYBOARD_KEY {
  ENTER = 'Enter',
}

type Props = {
  onChange?: (query: string) => void;
};

export const SearchBar = ({ onChange }: Props) => {
  const [query, setQuery] = useState('');

  const cleanSearchBar = () => {
    setQuery('');
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === KEYBOARD_KEY.ENTER) {
      if (query && onChange) {
        onChange(query);
        cleanSearchBar();
      }
    }
  };

  const placeHolderClasses = classNames(styles.placeholder, {
    [styles.placeholder_hide]: query.length > 0,
  });
  const cleanButtonClasses = classNames(styles.cleanButton, {
    [styles.cleanButton_hide]: query.length === 0,
  });

  return (
    <div className={styles.searchBar}>
      <div className={styles.wrapper}>
        <div className={placeHolderClasses}>Your city name</div>
        <Input
          role='searchbox'
          getRef={(input) => {
            input && input.focus();
          }}
          value={query}
          className={styles.input}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <div className={styles.actionButtons}>
          <Button className={styles.searchButton} role='search-button'>
            <SearchIcon />
          </Button>
          <Button
            className={cleanButtonClasses}
            onClick={cleanSearchBar}
            role='clean-button'
          >
            <CloseIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};
