import Link from 'next/link';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useMenuBorder } from '@/hooks';

type GnbTypeProps = {
  isborder: boolean;
};

const GnbCont = styled.div`
  border-bottom: 1px solid transparent;
  ${(props: GnbTypeProps) => props.isborder && css`border-bottom-color:rgba(0, 27, 55, 0.1);` }
`;

export default function Gnb() {
  const border = useMenuBorder()

  return (
    <GnbCont isborder={border} className='header'>
      <div className='header-wrap'>
        <div tabIndex={0} role="button">
            <Link href="/">YooSeok2</Link>
        </div>
        <ul className="header-menu">
          <Link href="/"><li>홈</li></Link>
          <Link href="/products"><li>상품</li></Link>
          <Link href="/cart"><li>장바구니</li></Link>
        </ul>
      </div>
    </GnbCont>
  )
}



