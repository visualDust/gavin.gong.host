import React, { useEffect, useState } from "react";
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveBar } from "@nivo/bar";
import { useMemo } from "react";

interface DataItem {
    name: string;
    total_seconds: number;
}

interface Data {
    languages: DataItem[];
    editors: DataItem[];
}

interface PieItem {
    id: string;
    label: string;
    value: number;
}

interface BarItem {
    name: string;
    value: number;
}

export function WakatimeFeatures(): JSX.Element {
    const [data, setData] = useState<Data | null>(null);
    useEffect(() => {
        fetch('/api/wakatime.ts').then(async response => {
            setData(await response.json());
        });
    }, []);

    // Cache processed data
    const [languages, editors] = useMemo(() => {
        if (data) {
            let languages = data.languages.map(x => ({
                id: x.name,
                label: x.name,
                value: Math.round(x.total_seconds / 60)
            } as PieItem));
            languages = makeOthers(languages);

            const editors = data.editors.map(x => ({
                name: x.name,
                value: Math.round(x.total_seconds / 60)
            } as BarItem));

            console.info({ languages, editors });
            return [languages, editors];
        }
        return [[], []];
    }, [data]);


    return (
        <section>
            <div className="container">
                <div className="row">
                    <div className="col col--6" style={{ height: '300px' }}><WakaLangPieChart data={languages} /></div>
                    <div className="col col--6" style={{ height: '300px' }}><WakaEdtrBarChart data={editors} /></div>
                </div>
            </div>
        </section>
    );
}

function makeOthers(data: PieItem[]) {
    const MAX_RATIO = 0.1;
    data = data.slice();
    const totalValue = data.reduce((v, x) => x.value + v, 0);
    data.sort((a, b) => a.value - b.value);
    let i = 0;
    let iSum = 0;
    for (; i < data.length; i++) {
        if (iSum + data[i].value > totalValue * MAX_RATIO) {
            break;
        } else {
            iSum += data[i].value;
        }
    }
    if (i > 0) {
        data.splice(0, i);
        data.unshift({
            id: "Others",
            label: "Others",
            value: iSum,
        } as any);
    }
    return data.sort((a, b) => b.value - a.value);
}

const WakaLangPieChart = ({ data /* see data tab */ }) => (
    <ResponsivePie
        data={data}
        theme={{
            tooltip: {
                basic: {
                    color: '#000000'
                }
            }
        }}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.35}
        padAngle={1}
        cornerRadius={5}
        activeInnerRadiusOffset={10}
        activeOuterRadiusOffset={10}
        colors={{ scheme: 'blues' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#999999"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'ruby'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'c'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'go'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'python'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'scala'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'lisp'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'elixir'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'javascript'
                },
                id: 'lines'
            }
        ]}
        motionConfig="wobbly"
        legends={[]}
    />
);

const WakaEdtrBarChart = ({ data /* see data tab */ }) => (
    <ResponsiveBar
        data={data}
        theme={{
            textColor: '#999999',
            tooltip: {
                basic: {
                    color: '#000000'
                }
            }
        }}
        keys={['value']}
        indexBy="name"
        margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
        groupMode="grouped"
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        padding={0.3}
        innerPadding={10}
        colors={{ scheme: 'blues' }}
        colorBy="indexValue"
        borderRadius={3}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'fries'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'sandwich'
                },
                id: 'lines'
            }
        ]}
        axisTop={null}
        axisRight={null}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Timespent',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        enableGridY={false}
        enableLabel={false}
        labelSkipWidth={10}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        motionConfig="wobbly"
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={function (e) { return e.id + ": " + e.formattedValue + " in Editor: " + e.indexValue; }}
    />
);
