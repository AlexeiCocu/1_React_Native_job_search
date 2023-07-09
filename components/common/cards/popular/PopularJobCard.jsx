import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./popularjobcard.style";
import {checkImageURL} from "../../../../utils";


const PopularJobCard = ({ item, selectedJob, handleCardPress }) => {


    return (
        <TouchableOpacity
            style={styles.container(selectedJob, item)}
            onPress={() => handleCardPress(item)}
        >
            <TouchableOpacity style={styles.logoContainer(selectedJob, item)}>
                <Image
                    source={{
                        uri: checkImageURL(item.company?.employer_logo)
                            ? item.item.employer_logo
                            : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
                    }}
                    resizeMode='contain'
                    style={styles.logoImage}
                />
            </TouchableOpacity>
            <Text style={styles.companyName} numberOfLines={1}>
                {item.item.company.name}
            </Text>

            <View style={styles.infoContainer}>
                <Text style={styles.jobName(selectedJob, item)} numberOfLines={1}>
                    {item.item.name}
                </Text>
                <View style={styles.infoWrapper}>
                    <Text style={styles.publisher(selectedJob, item)}>
                        {item.item?.website}
                    </Text>
                    <Text style={styles.location}> {item.item.address.city}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default PopularJobCard;