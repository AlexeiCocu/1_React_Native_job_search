import React, {useState} from 'react'
import {View, Text, TouchableOpacity, ActivityIndicator, FlatList} from 'react-native'

import styles from './popularjobs.style'
import {useRouter} from "expo-router";
import {COLORS, SIZES} from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import useFetch from "../../../hook/useFetch";

const Popularjobs = () => {
    const router = useRouter();

    const { data, isLoading, error} = useFetch('users', {});


    const [selectedJob, setSelectedJob] = useState();

    const handleCardPress = (item) => {

        console.log('item', item)

        router.push(`/job-details/${item.item.id}`)

    };




    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Popular Jobs</Text>
                <TouchableOpacity>
                    <Text style={styles.headerBtn}>Show All</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.cardsContainer}>
                {isLoading ? (
                    <ActivityIndicator size='large' colors={COLORS.primary}/>
                ) : error ? (
                    <Text>Something went wrong</Text>
                ) : (
                    <FlatList
                        data={data}
                        renderItem={(item) => (
                            <PopularJobCard
                                item={item}
                                selectedJob={selectedJob}
                                handleCardPress={handleCardPress}/>
                        )}
                        keyExtractor={item => item.id}
                        contentContainerStyle={{columnGap: SIZES.medium}}
                        horizontal={true}
                    />
                )}

            </View>
        </View>
    )
}

export default Popularjobs