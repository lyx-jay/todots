# TodoList using React & Ts

It is the first time I use Ts and React to build a App, so I want to get familiar with these knowledge through continuous practice.

I hope this project is helpful for beginners in react and ts. If you are interested in it, please click [Github](git@github.com:lyx-jay/todots.git)

创建 React + Ts 项目: `npx create-react-app my-app --template typescript`

## Summarize

### Primary knowledge of TypeScript 

1. **type**: 类型别名

    顾名思义，一个指代任意类型的名字，其语法为：

    ```ts
    type Point = {
      x: number;
      y: number;
    }
    ```
    可以使用类型别名给任意类型一个名字

2. **readonly**: 只读属性

    一旦属性被标记为 readonly，那么在进行类型检查时，该属性是不能被写入的。

    这里的无法被写入可以理解为**内存地址**无法被改变，但其内部的内容还是可以改变
    ```ts
    interface Home {
      readonly resident: { name: string; age: number };
    }
 
    function visitForBirthday(home: Home) {
      // We can read and update properties from 'home.resident'.
      console.log(`Happy birthday ${home.resident.name}!`);
      home.resident.age++;
    }
 
    function evict(home: Home) {
      // But we can't write to the 'resident' property itself on a 'Home'.
      home.resident = {
      // Cannot assign to 'resident' because it is a read-only property.
        name: "Victor the Evictor",
        age: 42,
      };
    }
    ```

    readonly的几种用法：
    ```ts
    // 对每一个属性都添加readonly修饰符，表示每个属性都不能修改
    type Todo = {
      readonly id: number;
      readonly text: string;
    }

    // 以上写法等同于以下写法
    type Todo = Readonly<{
      id: number;
      text: string;
    }>
    ```

    在 TypeScript 中，如果对一个 `Object` 类型使用 `Readonly<...>` 关键字，它将会使该对象类型的所有属性变为 `readonly`.

    ```ts
    type Foo = {
      bar: number
    }
    type ReadonlyFoo = Readonly<Foo>
    ```

    有一点需要注意, 以以上Todo类型为例
    ```ts
    type Todo = Readonly<{
      id: number;
      text: string;
    }>

    type todos = readonly Todo[]
    ```
    对于 `todos`, 由于在定义`Todo`时已经使用了 `readonly`，每一个在列表中的todoItem都是只读的，但 `todos` 列表本身仍然可以改变，因此，需要再添加一个 `readonly` 使列表不可改变

3. **&**: Intersection Types

    用于合并已经存在的对象类型

### Functional components 在 Ts 中的类型定义

关于函数组件在TS中的类型定义，通常有两种写法

1. React.FC<>

    ```TS
    /* Avoid this: */
    type BadProps = { text: string };
    const BadComponent: FC<BadProps> = ({ text, children }) => (
      <div>
        <div>{text}</div>
        {children}
      </div>
    );
    ```

2. normal version

    ```ts
    /* Do this instead: */
    type GoodProps = { text: string; children?: React.ReactNode };
    const GoodComponent = ({ text, children }: GoodProps) => (
      <div>
        <div>{text}</div>
        {children}
      </div>
    );
    ```

不推荐使用第一种写法，其会造成以下问题:

  1. children props were implicitly added
  2. Generic Type was not supported on children

具体可参考连接
  * ['ADR006: Avoid React.FC and React.SFC'](https://backstage.io/docs/architecture-decisions/adrs-adr006)
  * [TypeScript React.FC<Props> confusion](https://stackoverflow.com/questions/59988667/typescript-react-fcprops-confusion)
### useState 在父子组件传值中的应用

在函数组件中，父子组件通信与类组件相同，均是通过 props 进行传递。需要注意的是，当子组件调用父组件方法时，需要在props的类型定义中也增加对应定义。

useState 注意事项：
  ```ts
  function Home() {
    const [names, setName] = useState(['kobe', 'james']);

      function addFriend() {
        names.push("nba");
        console.log(names);
        setNames(names);
      }

      // 将addFriend改为以下形式即可将数据正确渲染到视图上
      function addFriend() {
        const newNames = names.slice();
        newNames.push('aaa');
        setNames(newNames)
      }

    return (
      <div>
        <ul>
          {names.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
        <button onClick={addFriend}>添加好友</button>           // 1
        <button onClick={() => addFriend()}>添加好友</button>   // 2
      </div>
    )
  }
  ```
  对于这两种button触发方式，可以向names中添加数据，但是不会渲染到视图上。

  原因在于，对于State的更新，需要比较新旧两个state是否相同。对于基本数据类型，直接比较即可；对于引用数据类型，会比较二者的内存地址，若内存地址相同，即使
  该数据内部发生变化，也被视为是一样的
  

### useRef 在 Ts 中问题

在使用TypeScript时，useRef的类型定义需要注意:

```ts
import "./styles.css";
import { useRef, useState } from "react";

export default function App() {
  const [msg, setMsg] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>{msg}</h2>
      <input type="text" ref={inputRef} />
      // 添加！断言，表明current一定不为null
      <button onClick={() => setMsg(inputRef.current!.value)}>CLICK</button>
    </div>
  );
}

```

### redux + hook（useSelector, useDispatch） 

useSelector、useDispatch 是 react-redux 提供的hook，可以简化redux的编写

useSelector的作用是将state映射到组件中：

* 参数一：将state映射到需要的数据中；
* 参数二：可以进行比较来决定是否组件重新渲染；

```js
function Profile(props) {
  const {banners, recommends, counter} = useSelector(state => ({
    banners: state.homeInfo.banners,
    recommends: state.homeInfo.recommends
  }));
  ...
}
```

useDispatch 可以直接获取dispatch函数，在组件中直接使用

```js
const dispatch = useDispatch()
```

### Refactor Code

当需要重构代码时，可以新建一个分支进行重构，完成后将其合并到base分支上，将新建分支删除。

注意删除本地新建分支以及同步本地base分支代码

