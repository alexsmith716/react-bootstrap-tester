// @flow
import React from 'react';
import styled from 'styled-components';
import { media } from '../../../styles/breakpoints';
import HomeSearch from './HomeSearch';

import css from './home.scss';
import style from './style.css';

const HomeHeader = (props: { showHeaderText: true }) => (
  <Header className={style.colorMarginStyle}>
    {props.showHeaderText && (
      <HeaderText className={css.coloredText}>
        <hr />
        Find the best jobs<br />at the best tech companies
        <hr />
        <br />
        <div className={`row ${css.colItems}`}>
          <div className={`col-md-4 ${css.colItem}`}>
            <span className="glyphicon glyphicon-headphones" />
            <span className={css.text}>{'It.'}</span>
          </div>
          <div className={`col-md-4 ${css.colItem}`}>
            <span className="glyphicon glyphicon-glass" />
            <span className={css.text}>{'Just.'}</span>
          </div>
          <div className={`col-md-4 ${css.colItem}`}>
            <span className="glyphicon glyphicon-thumbs-up" />
            <span className={css.text}>{'Works.'}</span>
          </div>
        </div>
      </HeaderText>
    )}
    <HomeSearch />
  </Header>
);

export default HomeHeader;

const Header = styled.div`
  max-width: 900px;
  margin: 0 auto 50px;
  padding: 80px 0 50px;
  line-height: 1.1;

  ${media.desktop`
    padding: 30px 24px;
  `};

  ${media.tablet`
    padding: 24px;
  `};
`;

const HeaderText = styled.h1`
  font-size: 54px;
  font-weight: 900;
  text-align: center;
  line-height: 1.2;
  font-family: ${props => props.theme.fontFamily.tiempos};
  margin-bottom: 40px;

  ${media.desktop`
    font-size: 50px;
  `};

  ${media.phablet`
    font-size: 38px;
  `};

  ${media.phone`
    font-size: 34px;
    text-align: left;
    margin: 10px auto 48px;
    line-height: 1.3;
  `};
`;
