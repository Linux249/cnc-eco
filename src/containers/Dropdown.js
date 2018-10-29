import React, { Component } from 'react';
import '../style/DropDown.css';

// code from https://codepen.io/ariona/pen/pENkXW

var menuItems = [].slice.call(document.querySelectorAll('.menu__item')),
    menuSubs = [].slice.call(document.querySelectorAll('.dropdown-menu')),
    selectedMenu = undefined,
    subBg = document.querySelector('.dropdown__bg'),
    subBgBtm = document.querySelector('.dropdown__bg-bottom'),
    subArr = document.querySelector('.dropdown__arrow'),
    subCnt = document.querySelector('.dropdown__wrap'),
    header = document.querySelector('.main-header'),
    // closeDropdownTimeout,

    openDropdown = function(el) {
        //- get menu ID
        var menuId = el.getAttribute('data-sub');
        //- get related sub menu
        var menuSub = document.querySelector('.dropdown-menu[data-sub="' + menuId + '"]');
        //- get menu sub content
        var menuSubCnt = menuSub.querySelector('.dropdown-menu__content');
        //- get bottom section of current sub
        var menuSubBtm = menuSubCnt.querySelector('.bottom-section').getBoundingClientRect();
        //- get height of top section
        var menuSubTop = menuSubCnt.querySelector('.top-section').getBoundingClientRect();
        //- get menu position
        var menuMeta = el.getBoundingClientRect();
        //- get sub menu position
        var subMeta = menuSubCnt.getBoundingClientRect();

        //- set selected menu
        selectedMenu = menuId;

        //- Remove active Menu
        menuItems.forEach(el => el.classList.remove('active'));
        //- Set current menu to active
        el.classList.add('active');

        //- Remove active sub menu
        menuSubs.forEach(el => el.classList.remove('active'));
        //- Set current menu to active
        menuSub.classList.add('active');

        //- Set dropdown menu background style to match current submenu style
        subBg.style.opacity = 1;
        subBg.style.left = menuMeta.left - (subMeta.width / 2 - menuMeta.width / 2) + 'px';
        subBg.style.width = subMeta.width + 'px';
        subBg.style.height = subMeta.height + 'px';
        //- Set dropdown menu bottom section background position
        subBgBtm.style.top = menuSubTop.height + 'px';
        console.log(menuSubBtm);

        //- Set Arrow position
        subArr.style.opacity = 1;
        subArr.style.left = menuMeta.left + menuMeta.width / 2 - 10 + 'px';

        //- Set sub menu style
        subCnt.style.opacity = 1;
        subCnt.style.left = menuMeta.left - (subMeta.width / 2 - menuMeta.width / 2) + 'px';
        subCnt.style.width = subMeta.width + 'px';
        subCnt.style.height = subMeta.height + 'px';

        //- Set current sub menu style
        menuSub.style.opacity = 1;

        header.classList.add('dropdown-active');
    },
    closeDropdown = function() {
        //- Remove active class from all menu items
        menuItems.forEach(el => el.classList.remove('active'));
        //- Remove active class from all sub menus
        menuSubs.forEach(el => {
            el.classList.remove('active');
            el.style.opacity = 0;
        });
        //- set sub menu background opacity
        subBg.style.opacity = 0;
        //- set arrow opacity
        subArr.style.opacity = 0;

        // unset selected menu
        selectedMenu = undefined;

        header.classList.remove('dropdown-active');
    };

//- Binding mouse event to each menu items
menuItems.forEach(el => {
    //- mouse enter event
    el.addEventListener(
        'mouseenter',
        function() {
            stopCloseTimeout();
            openDropdown(this);
        },
        false
    );

    //- mouse leave event
    el.addEventListener('mouseleave', () => startCloseTimeout(), false);
});

//- Binding mouse event to each sub menus
menuSubs.forEach(el => {
    el.addEventListener('mouseenter', () => stopCloseTimeout(), false);
    el.addEventListener('mouseleave', () => startCloseTimeout(), false);
});

export default class DropDown extends Component {
    state = {
        closeDropdownTimeout: null,
    };

    startCloseTimeout = () => {
        this.setState({ closeDropdownTimeout: setTimeout(() => closeDropdown(), 50) });
    };

    stopCloseTimeout = () => {
        clearTimeout(closeDropdownTimeout);
    };

    render() {
        return (
            <header className="main-header">
                <ul className="menu">
                    <li className="menu__item" data-sub="product">
                        <a href="#">Product</a>
                    </li>
                    <li className="menu__item" data-sub="developer">
                        <a href="#">Developer</a>
                    </li>
                    <li className="menu__item" data-sub="company">
                        <a href="#">Company</a>
                    </li>
                </ul>
                <div className="dropdown-holder">
                    <div className="dropdown__arrow" />
                    <div className="dropdown__bg">
                        <div className="dropdown__bg-bottom" />
                    </div>
                    <div className="dropdown__wrap">
                        <div className="dropdown-menu" id="product" data-sub="product">
                            <div className="dropdown-menu__content">
                                <div className="top-section">
                                    <div className="col-2">
                                        <ul>
                                            <li>
                                                <a href="">
                                                    <h3>Payment</h3>
                                                    <p>
                                                        {' '}
                                                        Lorem ipsum dolor sit amet, consectetur
                                                        adipisicing elit.
                                                    </p>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="">
                                                    <h3>Connect</h3>
                                                    <p>
                                                        {' '}
                                                        consectetur adipisicing elit nesciunt!
                                                        Assumenda, adipisci.
                                                    </p>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="">
                                                    <h3>Atlas</h3>
                                                    <p>
                                                        {' '}
                                                        ipsum dolor sit amet, consectetur
                                                        adipisicing elit. .
                                                    </p>
                                                </a>
                                            </li>
                                        </ul>
                                        <ul>
                                            <li>
                                                <a href="">
                                                    <h3>Subscription</h3>
                                                    <p> Lorem ipsum dolor sit amet, consectetur </p>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="">
                                                    <h3>Relay</h3>
                                                    <p>
                                                        {' '}
                                                        amet, consectetur adipisicing elit. Nisi,
                                                        sequi!
                                                    </p>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="bottom-section">
                                    <ul>
                                        <li>
                                            <a href="">Payment</a>
                                        </li>
                                        <li>
                                            <a href="">Connect</a>
                                        </li>
                                        <li>
                                            <a href="">Atlas</a>
                                        </li>
                                        <li>
                                            <a href="">Connect</a>
                                        </li>
                                        <li>
                                            <a href="">Atlas</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="dropdown-menu" id="developer" data-sub="developer">
                            <div className="dropdown-menu__content">
                                <div className="top-section">
                                    <div className="col-2">
                                        <div>
                                            <h2 className="menu-title">Front End</h2>
                                            <ul>
                                                <li>
                                                    <a href="">Payment</a>
                                                </li>
                                                <li>
                                                    <a href="">Connect</a>
                                                </li>
                                                <li>
                                                    <a href="">Atlas</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h2 className="menu-title">Back End</h2>
                                            <ul>
                                                <li>
                                                    <a href="">Payment</a>
                                                </li>
                                                <li>
                                                    <a href="">Connect</a>
                                                </li>
                                                <li>
                                                    <a href="">Atlas</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="bottom-section info">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                        Odit totam officia molestias
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="dropdown-menu" data-sub="company">
                            <div className="dropdown-menu__content">
                                <div className="top-section">
                                    <ul>
                                        <li>
                                            <a href="">Payment</a>
                                        </li>
                                        <li>
                                            <a href="">Connect</a>
                                        </li>
                                        <li>
                                            <a href="">Atlas</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="bottom-section">
                                    <ul>
                                        <li>
                                            <a href="">Payment</a>
                                        </li>
                                        <li>
                                            <a href="">Connect</a>
                                        </li>
                                        <li>
                                            <a href="">Atlas</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}
