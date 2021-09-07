/*
 * Copyright (c) 2021 Terminus, Inc.
 *
 * This program is free software: you can use, redistribute, and/or modify
 * it under the terms of the GNU Affero General Public License, version 3
 * or later ("AGPL"), as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import React from 'react';
import { NextPage } from 'next';
import { Button, Input } from 'antd';
import Image from 'next/image';
import { useUpdate } from 'src/common/utils';

interface HomePageProps {
  a: string;
}

const Home: NextPage<HomePageProps> = () => {
  const [state, setState] = React.useState('');
  const [{ a }, updater] = useUpdate({
    a: 2,
  });

  return (
    <div className="h-full p-10">
      <Input className="w-full h-full color-red" value={state} onChange={(e) => setState(e.target.value)} />
      <div>{a}</div>

      <div>
        <Button onClick={() => updater.a(a + 1)}>点击我</Button>
      </div>
      <Image src="/code.jpg" alt="sss" width="800px" height="300px" />
    </div>
  );
};

export default Home;
