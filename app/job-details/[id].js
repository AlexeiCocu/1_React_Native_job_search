import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, RefreshControl, SafeAreaView, ScrollView, Text} from "react-native";
import {Stack, useRouter, useSearchParams} from "expo-router";
import useFetch from "../../hook/useFetch";
import {COLORS, SIZES} from "../../constants";
import {
    Company,
    JobAbout,
    JobFooter,
    JobTabs,
    ScreenHeaderBtn,
    Specifics,
} from "../../components";
import icons from "../../constants/icons";
import View from "react-native-web/dist/vendor/react-native/Animated/components/AnimatedView";
import axios from "axios";



const tabs = ['About', 'Qualifications', 'Responsibilities'];


const JobDetails = () => {
    const [activeTab, setActiveTab] = useState(tabs[0])
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    const params = useSearchParams();
    const router = useRouter();

    const fetchData_user = async () => {
        setIsLoading(true);

        const options = {
            method: 'GET',
            url: `https://jsonplaceholder.typicode.com/users`,
            params: {id: params.id}
        };

        try {
            const response = await axios.request(options);
            setData(response.data);
            setIsLoading(false);

        } catch (error) {
            setError(error);
            alert('There is an error.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData_user()
    }, [params.id])


    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchData_user();
        setRefreshing(false);

    }, [])

    const displayTabContent = () => {
        // console.log('merge')

        const aboutText = 'Praesent euismod sem quis est efficitur malesuada. In imperdiet quam sem, ut feugiat tellus ' +
            'fermentum vel. Fusce fermentum vel odio eu consectetur. Curabitur molestie nisl vel cursus euismod.' +
            ' Vivamus sed tempor felis. Donec consectetur posuere vulputate. Morbi vel orci lacus.'

        switch (activeTab) {
            case "Qualifications":
                return (
                    <Specifics
                        title='Qualifications'
                        points={['ex 1', 'ex.2', 'ex3', 'ex4'] ?? ["N/A"]}
                    />
                );

            case "About":
                return (
                    <JobAbout info={aboutText ?? "No data provided"} />
                );

            case "Responsibilities":
                return (
                    <Specifics
                        title='Responsibilities'
                        points={['ex 1', 'ex.2', 'ex3', 'ex4'] ?? ["N/A"]}
                    />
                );

            default:
                return null;
        }
    };

    // console.log(params.id)
    // console.log('data', data[0])

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconURL={icons.left}
                            dimension='60%'
                            handlePress={() => router.back()}
                        />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn iconURL={icons.share} dimension='60%' />
                    ),
                    headerTitle: "",
                }}
            />

            <>
                <ScrollView
                    showsVerticalIndicator={false}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                >
                    {isLoading ? (
                        <ActivityIndicator size="large" color={COLORS.primary}/>
                    ) : error ? (
                        <Text>Something went wrong loading job details.</Text>
                    ) : data.length === 0 ? (
                        <Text>No data</Text>
                    ) : (
                        <View style={{padding: SIZES.medium, paddingBottom: 100}}>
                            <Company
                                companyLogo={'https://via.placeholder.com/600/24f355'}
                                jobTitle={data[0].name}
                                companyName={data[0].company.name}
                                location={data[0].address.city}
                            />
                            <JobTabs
                                tabs={tabs}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            />


                            {displayTabContent()}
                        </View>
                    )}

                </ScrollView>

                <JobFooter url={data[0]?.website_test ?? 'https://careers.google.com/jobs/results/'} />
            </>



        </SafeAreaView>
    );
};

export default JobDetails;