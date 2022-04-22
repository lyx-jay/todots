# TodoList using React & Ts

It is the first time I use Ts and React to build a App, so I want to get familiar with these knowledge through continuous practice.

I hope this project is helpful for beginners in react and ts. If you are interested in it, please click [Github](git@github.com:lyx-jay/todots.git)

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

### 函数组件 props 在 Ts 中的类型定义

### useState 在父子组件传值中的应用

### useRef 在 Ts 中问题
2. 函数组件在Typescript中的应用
3. useState在父子组件传值的应用
4. useRef在TS中的应用