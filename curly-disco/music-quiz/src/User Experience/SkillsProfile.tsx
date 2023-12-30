import React, { useState, useEffect } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {  ChartContainer, DifficultyLabel, TimeLabel, StyledDropdown, CustomTooltip } from './Style/UserRecord.styles';
import axios from 'axios';
import { format } from 'date-fns-tz';


type DataPoint = {
    score: number;
    timeSpent: number;
    difficulty: string;
    date: string;
};



const MyScatterPlot: React.FC = () => {
    type RelevantTimeFrame = {
        startDate: string;
        endDate: string;
    };
    const [xAxisData, setXAxisData] = useState<{ time: number; date: string }[]>([]);
    const [data, setData] = useState<DataPoint[]>([]);
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
    const [selectedTimeFrame, setSelectedTimeFrame] = useState<string>('All');
    const [relevantTimeFrame, setRelevantTimeFrame] = useState<RelevantTimeFrame>({
        startDate: '',
        endDate: '',
    });

    const calculateRelevantTimeFrame = (selectedTimeFrame: string) => {
        const currentDate = new Date();
        
        switch (selectedTimeFrame) {
            case 'Day':
                const dayStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0);
                const dayEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59);
                return { startDate: dayStartDate.toISOString(), endDate: dayEndDate.toISOString() };
    
            case 'Month':
                const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59);
                return { startDate: firstDayOfMonth.toISOString(), endDate: lastDayOfMonth.toISOString() };
    
            case 'Year':
                const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);
                const lastDayOfYear = new Date(currentDate.getFullYear(), 11, 31, 23, 59, 59);
                return { startDate: firstDayOfYear.toISOString(), endDate: lastDayOfYear.toISOString() };
    
            default:
                return { startDate: '', endDate: '' };
        }
    };

    useEffect(() => {
        setRelevantTimeFrame(calculateRelevantTimeFrame(selectedTimeFrame));
    }, [selectedTimeFrame]);

    const calculateXAxisData = () => {
        const startDate = new Date(relevantTimeFrame.startDate);
        const endDate = new Date(relevantTimeFrame.endDate);
    
        switch (selectedTimeFrame) {
            case 'Day':
                const hoursDifference = (endDate.getTime() - startDate.getTime()) / (1000 * 3600);
                return Array.from({ length: hoursDifference + 1 }, (_, index) => ({
                    time: index,
                    date: format(new Date(startDate.getTime() + index * (1000 * 3600)), 'yyyy-MM-dd HH:mm:ssXXX', { timeZone: 'America/New_York' }),
                }));
    
            case 'Month':
                const monthsDifference = (endDate.getFullYear() - startDate.getFullYear()) * 12 + endDate.getMonth() - startDate.getMonth();
                return Array.from({ length: monthsDifference + 1 }, (_, index) => {
                    const monthDate = new Date(startDate.getFullYear(), startDate.getMonth() + index, 1);
                    return {
                        time: index,
                        date: format(monthDate, 'yyyy-MM-dd HH:mm:ssXXX', { timeZone: 'America/New_York' }),
                    };
                });
    
            case 'Year':
                const yearsDifference = endDate.getFullYear() - startDate.getFullYear();
                return Array.from({ length: yearsDifference + 1 }, (_, index) => {
                    const yearDate = new Date(startDate.getFullYear() + index, 0, 1);
                    return {
                        time: index,
                        date: format(yearDate, 'yyyy-MM-dd HH:mm:ssXXX', { timeZone: 'America/New_York' }),
                    };
                });
    
            case 'All':
                const games = data.map((game) => new Date(game.date).getTime());
                const minDate = new Date(Math.min(...games));
                const maxDate = new Date(Math.max(...games));
                const allDifference = (maxDate.getTime() - minDate.getTime()) / (1000 * 3600 * 24);
                return Array.from({ length: allDifference + 1 }, (_, index) => ({
                    time: index,
                    date: format(new Date(minDate.getTime() + index * (1000 * 3600 * 24)), 'yyyy-MM-dd HH:mm:ssXXX', { timeZone: 'America/New_York' }),
                }));
    
            default:
                return [];
        }
    };

    useEffect(() => {
        setXAxisData(calculateXAxisData());
    }, [relevantTimeFrame]);


    const fetchData = async () => {
    try {
        const currentUser = localStorage.getItem('username');
        const requestData = {
            currentUser: currentUser,
            relevantTimeFrame: relevantTimeFrame,
            difficulty: selectedDifficulty,
        };

        // Replace 'your_backend_endpoint' with the actual endpoint to fetch data
        const response = await axios.post('http://127.0.0.1:8000/api/userrecord/', requestData, {
            withCredentials: false,
        });

        // Check if the response contains data and it's an array
        if (response.data && Array.isArray(response.data.data)) {
            // Transform backend data to match frontend structure
            const transformedData: DataPoint[] = response.data.data.map((backendItem: any) => {
                return {
                    score: backendItem.score,
                    timeSpent: backendItem.totalTime,
                    difficulty: backendItem.gameDifficulty,
                    date: new Date(backendItem.datePlayed).toISOString(),
                };
            });

            console.log(transformedData);
            setData([...transformedData].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
        } else {
            console.error('Invalid response format:', response.data);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

    useEffect(() => {
        fetchData(); // Fetch data when the component mounts
    }, [relevantTimeFrame, selectedDifficulty]); // Empty dependency array ensures it runs only once when the component mounts

    // Function to handle difficulty selection
    const handleDifficultyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDifficulty(event.target.value);
    };

    // Function to handle time frame selection
    const handleTimeFrameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value);
        setSelectedTimeFrame(event.target.value);
    };
    const renderCustomTooltip = (props: any) => {
        const { payload } = props;
    
        if (payload && payload.length) {
            const dataPoint = payload[0].payload as DataPoint;
            return (
                <CustomTooltip>
                    <p>Date: {format(new Date(dataPoint.date), 'yyyy-MM-dd HH:mm:ssXXX', { timeZone: 'America/New_York' })}</p>
                    <p>Score: {dataPoint.score}</p>
                    <p>Difficulty: {dataPoint.difficulty}</p>
                </CustomTooltip>
            );
        }
    
        return null;
    };

    return (
        <>
            <div>
                <DifficultyLabel>
                    Difficulty:
                    <StyledDropdown value={selectedDifficulty} onChange={handleDifficultyChange}>
                        <option value="All">All</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                        <option value="Insane">Insane</option>
                    </StyledDropdown>
                </DifficultyLabel>

                <TimeLabel>
                    Time Frame:
                    <StyledDropdown value={selectedTimeFrame} onChange={handleTimeFrameChange}>
                         <option value="All">All</option>
                        <option value="Day">Day</option>
                        <option value="Month">Month</option>
                        <option value="Year">Year</option>
                    </StyledDropdown>
                </TimeLabel>
            </div>
   
            <ChartContainer>
                <ResponsiveContainer width={650} height={550}>
                    <ScatterChart>
                        <CartesianGrid stroke="rgba(0, 0, 0, 0.8)"/>
                        <XAxis
                          type="category"  // Use 'category' type for dates
                          dataKey="date"
                          name="Time"
                          tickFormatter={(value) => format(new Date(value), 'yyyy-MM-dd HH:mm:ssXXX', { timeZone: 'America/New_York' })}
                        />

                        <YAxis type="number" dataKey="score" name="Score" />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} content={(props: any) => renderCustomTooltip(props)} />
                        <Scatter data={data.map((point, index) => ({ ...point, id: index }))} fill="#02661d" />
                    </ScatterChart>
                </ResponsiveContainer>
            </ChartContainer>
        </>
    );
};
export default MyScatterPlot;