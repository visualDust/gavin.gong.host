import React, { useEffect, useState } from "react";
import { ResponsivePie } from '@nivo/pie'
import { ResponsiveBar } from "@nivo/bar";

export function WakatimeFeatures(): JSX.Element {
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch('/api/wakatime.ts').then(async response => {
            setData(await response.json());
        })
    }, []);

    let languages = [];
    let editors = [];

    if (data) {
        languages = data.languages.map(x => ({
            id: x.name,
            label: x.name,
            value: Math.round(x.total_seconds / 60)
        }));
        editors = data.editors.map(x=>({
            name: x.name,
            value: Math.round(x.total_seconds / 60)
        }))
        console.info({languages, editors})
    }


    return (
        <section>
            <div className="container" style={{ height: '300px' }}>
                <div style={{ display: 'inline-block', height: '100%', width: '50%' }}><MyResponsivePie data={languages} /></div>
                <div style={{ display: 'inline-block', height: '100%', width: '50%' }}><MyResponsiveBar data={editors} /></div>
            </div>
        </section>
    )
}


const MyResponsivePie = ({ data /* see data tab */ }) => (
    <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.35}
        padAngle={1}
        cornerRadius={5}
        activeInnerRadiusOffset={10}
        activeOuterRadiusOffset={10}
        colors={{ scheme: 'blues' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#999999"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [ [ 'darker', 2 ] ] }}
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
)

const MyResponsiveBar = ({ data /* see data tab */}) => (
    <ResponsiveBar
        data={data}
        theme={{
            textColor: '#999999'
        }}
        keys={[ 'value' ]}
        indexBy="name"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        groupMode="grouped"
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        padding={0.3}
        innerPadding={10}
        colors={{ scheme: 'blues' }}
        colorBy="indexValue"
        borderRadius={3}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
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
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        motionConfig="wobbly"
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in Editor: "+e.indexValue}}
    />
)