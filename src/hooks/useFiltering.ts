import { useState } from "react";

interface Filter {
    name: string;
    value: string;
    condition: (item: any, value: string) => boolean;
}

const useFiltering = (data: any[], filters: Filter[]) => {
    const [filterValues, setFilterValues] = useState(() => {
        const filterInitialValues = filters.map((f) => ({
            name: f.name,
            value: f.value,
        }));
        return filterInitialValues;
    });
    console.log(data)
    const filteringConditions = filters.map((f) => f.condition);
    const filterFunction = (collection: any) =>
        filteringConditions.reduce((data, conditionFn, index) => {
            if (Array.isArray(data)) {
                console.log("is array")
                return data.filter((item: any) => {
                    return conditionFn(item, filterValues[index].value);
                });
            } else {
                // Handle non-array data
                console.log("is not array")
                return data;
            }
        }, collection);

    return {
        filterValues,
        setFilterValues,
        filterFunction,
    };
};

export default useFiltering;