import { create } from 'zustand'
import { persist } from "zustand/middleware";
import { Order, SummaryOrder, NewOrder } from '../model/order';
import { nanoid } from 'nanoid'

interface OrderState {
    orders: Order[];
    newOrders: NewOrder;
    previewOrder: Order[];
    uniqOrder: Order[];
    isloaded: boolean;
    filterKeyword: string;
    summaryOrders: SummaryOrder[];
    total: number;
    currentAmount: number;
    changeKeyword: (newKeyword: string) => void;
    setDefaultOrders: () => void;
    setSummaryOrders: (newObj: SummaryOrder[]) => void;
    addOrder: () => void;
    removeOrder: (id: string) => void;
    editOrder: (newData: object, id: number) => void;
    changeColor: (newData: object, name: string) => void;
    editNewOrder: (newData: object) => void;
    onPaidOrder: (checked: boolean, id: number) => void;
    makePreviewOrder: (OrderType: string) => void;
    summarize: () => void;
}

function nPermute(arr: string[]) {
    var result: string[] = []
    // currentSize should be invoked with the array size
    function permutation(arr: string[], currentSize: number) {
        if (currentSize == 1) { // recursion base-case (end)
            result.push(arr.join(""));
            return;
        }

        for (let i = 0; i < currentSize; i++) {
            permutation(arr, currentSize - 1);
            if (currentSize % 2 == 1) {
                let temp = arr[0];
                arr[0] = arr[currentSize - 1];
                arr[currentSize - 1] = temp;
            } else {
                let temp = arr[i];
                arr[i] = arr[currentSize - 1];
                arr[currentSize - 1] = temp;
            }
        }
    }
    permutation(arr, arr.length)
    return [...new Set(result)]

}

export const useMainStore = create<OrderState>()(
    persist(
        (set, get) => ({
            orders: [],
            uniqOrder: [],
            newOrders: {
                id: nanoid(),
                name: "Luffy",
                number: "123",
                price: 10,
                setType: "",
            },
            filterKeyword: "ทั้งหมด",
            previewOrder: [],
            summaryOrders: [],
            total: 0,
            currentAmount: 0,
            isloaded: false,
            setDefaultOrders: async () => {
                var res = await fetch('http://localhost:3000/api/prefetch')
                var historyData = await res.json()
                set((state) => ({
                    orders: historyData.orders,
                }));
                set((state) => ({
                    uniqOrder: [...new Map(state.orders.map(item => [item["name"], item])).values()].filter(el => el.name)
                }));
                get().summarize()
                set({ isloaded: true })
            },

            changeKeyword: (newKeyword: string) => {
                set((state) => ({
                    filterKeyword: newKeyword,
                }));
            },
            setSummaryOrders: (newObj: SummaryOrder[]) => {
                set((state) => ({
                    summaryOrders: newObj,
                }));
            },
            onPaidOrder: (checked: boolean, index: number) => {
                var temp = get().summaryOrders
                temp[index] = { ...temp[index], ...{ isPaid: checked } }

                const total = temp?.reduce((accumulator: any, object: any) => {
                    return accumulator + object.sum;
                }, 0)
                const currentAmount = temp?.filter((el: any) => el.isPaid).reduce((accumulator: any, object: any) => {
                    return accumulator + object.sum;
                }, 0)

                set((state) => ({
                    summaryOrders: temp,
                    total,
                    currentAmount
                }));
            },
            addOrder: () => {
                set((state) => ({
                    orders: [...state.orders, ...state.previewOrder],
                }));
                set((state) => ({
                    uniqOrder: [...new Map(state.orders.map(item => [item["name"], item])).values()].filter(el => el.name)
                }));
                get().summarize()

            },
            removeOrder: (id: string) => {
                const removedData = get().orders.filter((el) => el.id != id)
                set((state) => ({
                    orders: removedData,
                    uniqOrder: [...new Map(removedData?.map(item => [item["name"], item])).values()].filter(el => el.name)
                }));
                get().summarize()
            },
            editOrder: (newData: object, index: number) => {
                var temp = get().orders
                temp[index] = { ...temp[index], ...newData }
                set((state) => ({
                    orders: temp,
                    uniqOrder: [...new Map(temp.map(item => [item["name"], item])).values()].filter(el => el.name)
                }));
                get().summarize()
            },
            changeColor: (newData: object, name: string) => {
                var temp = get().orders.map((el, index) => {
                    return el.name == name ? { ...get().orders[index], ...newData } : get().orders[index]
                })
                set((state) => ({
                    orders: temp,
                    uniqOrder: [...new Map(temp.map(item => [item["name"], item])).values()].filter(el => el.name)
                }));
                get().summarize()
            },
            editNewOrder: (newData: any) => {
                set((state) => ({
                    newOrders: { ...state.newOrders, ...newData },
                }));

                get().makePreviewOrder(get().newOrders?.setType)
            },

            makePreviewOrder: (OrderType: string) => {
                const nOrder = get().newOrders
                const setNumber: string[] = nPermute(nOrder?.number.split(""))
                console.log("setNumber :: ", setNumber)
                switch (OrderType) {
                    case "บน":
                        set((state) => ({
                            previewOrder: [{
                                id: nanoid(),
                                name: nOrder?.name,
                                number: nOrder?.number,
                                tod: 0,
                                top: nOrder?.price,
                                bot: 0,
                                sum: 0,
                                color: "#232230"
                            },]
                        }));
                        break;

                    case "บน+โต๊ด":
                        set((state) => ({
                            previewOrder: [{
                                id: nanoid(),
                                name: nOrder?.name,
                                number: nOrder?.number,
                                tod: nOrder?.price,
                                top: nOrder?.price,
                                bot: 0,
                                sum: 0,
                                color: "#232230"
                            },]
                        }));
                        break;

                    case "บน+ล่าง":
                        set((state) => ({
                            previewOrder: [{
                                id: nanoid(),
                                name: nOrder?.name,
                                number: nOrder?.number,
                                tod: 0,
                                top: nOrder?.price,
                                bot: nOrder?.price,
                                sum: 0,
                                color: "#232230"
                            },]
                        }));
                        break;

                    case "ล่าง":
                        set((state) => ({
                            previewOrder: [{
                                id: nanoid(),
                                name: nOrder?.name,
                                number: nOrder?.number,
                                tod: 0,
                                top: 0,
                                bot: nOrder?.price,
                                sum: 0,
                                color: "#232230"
                            },]
                        }));
                        break;

                    case "โต๊ด":
                        set((state) => ({
                            previewOrder: [{
                                id: nanoid(),
                                name: nOrder?.name,
                                number: nOrder?.number,
                                tod: nOrder?.price,
                                top: 0,
                                bot: 0,
                                sum: 0,
                                color: "#232230"
                            },]
                        }));
                        break;

                    case "ชุด (บน)":

                        set((state) => ({
                            previewOrder: [...setNumber.map(nEl => {
                                return {
                                    id: nanoid(),
                                    name: nOrder?.name,
                                    number: nEl,
                                    tod: 0,
                                    top: nOrder?.price,
                                    bot: 0,
                                    sum: 0,
                                    color: "#232230"
                                }
                            })]
                        }));
                        break;

                    case "ชุด (บน+โต๊ด)":

                        set((state) => ({
                            previewOrder: [...setNumber.map(nEl => {
                                return {
                                    id: nanoid(),
                                    name: nOrder?.name,
                                    number: nEl,
                                    tod: nOrder?.price,
                                    top: nOrder?.price,
                                    bot: 0,
                                    sum: 0,
                                    color: "#232230"
                                }
                            })]
                        }));
                        break;

                    case "ชุด (บน+ล่าง)":

                        set((state) => ({
                            previewOrder: [...setNumber.map(nEl => {
                                return {
                                    id: nanoid(),
                                    name: nOrder?.name,
                                    number: nEl,
                                    tod: 0,
                                    top: nOrder?.price,
                                    bot: nOrder?.price,
                                    sum: 0,
                                    color: "#232230"
                                }
                            })]
                        }));
                        break;

                    case "ชุด (ล่าง)":
                        set((state) => ({
                            previewOrder: [...setNumber.map(nEl => {
                                return {
                                    id: nanoid(),
                                    name: nOrder?.name,
                                    number: nEl,
                                    tod: 0,
                                    top: 0,
                                    bot: nOrder?.price,
                                    sum: 0,
                                    color: "#232230"
                                }
                            })]
                        }));
                        break;

                    case "ชุด (โต๊ด)":
                        set((state) => ({
                            previewOrder: [...setNumber.map(nEl => {
                                return {
                                    id: nanoid(),
                                    name: nOrder?.name,
                                    number: nEl,
                                    tod: nOrder?.price,
                                    top: 0,
                                    bot: 0,
                                    sum: 0,
                                    color: "#232230"
                                }
                            })]
                        }));
                        break;
                    default:
                        set((state) => ({
                            previewOrder: [{
                                id: nanoid(),
                                name: nOrder?.name,
                                number: nOrder?.number,
                                tod: 0,
                                top: nOrder?.price,
                                bot: 0,
                                sum: 0,
                                color: "#232230"
                            },]
                        }));
                        break;
                }
            },
            summarize: () => {
                const groupedOrders = [...get().orders].reduce((group: any, order: any) => {
                    const { name } = order;
                    group[name] = group[name] ?? [];
                    group[name].push(order);
                    return group;
                }, {});

                var tempSummmaryOrder: any[] = []
                Object.keys(groupedOrders).forEach((key: any) => {
                    if (key) {
                        const allTop = groupedOrders[key].reduce((accumulator: any, object: any) => {
                            return accumulator + object.top;
                        }, 0)
                        const allTod = groupedOrders[key].reduce((accumulator: any, object: any) => {
                            return accumulator + object.tod;
                        }, 0)
                        const allBot = groupedOrders[key].reduce((accumulator: any, object: any) => {
                            return accumulator + object.bot;
                        }, 0)

                        const allNUm: string[] = groupedOrders[key].map((el : any) => el.number)

                        var temp: SummaryOrder = {
                            id: nanoid(),
                            name: key,
                            number: allNUm.join(" "),
                            top: allTop,
                            tod: allTod,
                            bot: allBot,
                            sum: allTop + allTod + allBot,
                            isPaid: false
                        }
                        tempSummmaryOrder.push(temp)
                    }

                })

                const total = tempSummmaryOrder?.reduce((accumulator: any, object: any) => {
                    return accumulator + object.sum;
                }, 0)
                const currentAmount = tempSummmaryOrder?.filter((el: any) => el.isPaid).reduce((accumulator: any, object: any) => {
                    return accumulator + object.sum;
                }, 0)

                set((state) => ({
                    total,
                    currentAmount,
                    summaryOrders: tempSummmaryOrder
                }));
            }
        }),
        {
            name: "mainStore",
        }

    )
);
