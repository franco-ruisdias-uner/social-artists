import {View, Text, ScrollView, StyleSheet, FlatList, RefreshControl} from "react-native";
import {IPlace} from "@shared/models";
import {materialColors} from "@utils/colors";
import PlaceItem from "@app/tabs/screens/home/place-item";
import {useState} from "react";

const places: IPlace[] = [
  {id: 1, title: "Place 1", imageUrl: "", description: "Description 1", likes: 0, comments: [], distance: 1.6},
  {id: 2, title: "Place 2", imageUrl: "", description: "Description 2", likes: 0, comments: [], distance: 5},
  {id: 3, title: "Place 3", imageUrl: "", description: "Description 2", likes: 0, comments: [], distance: 5},
  {id: 4, title: "Place 4", imageUrl: "", description: "Description 2", likes: 0, comments: [], distance: 5},
  {id: 5, title: "Place 5", imageUrl: "", description: "Description 2", likes: 0, comments: [], distance: 5},
  {id: 6, title: "Place 6", imageUrl: "", description: "Description 2", likes: 0, comments: [], distance: 5},
  {id: 7, title: "Place 7", imageUrl: "", description: "Description 2", likes: 0, comments: [], distance: 5},
  {id: 8, title: "Place 8", imageUrl: "", description: "Description 2", likes: 0, comments: [], distance: 5},
  {id: 9, title: "Place 9", imageUrl: "", description: "Description 2", likes: 0, comments: [], distance: 5},
  {id: 10, title: "Place 10", imageUrl: "", description: "Description 2", likes: 0, comments: [], distance: 5},
  {id: 11, title: "Place 11", imageUrl: "", description: "Description 2", likes: 0, comments: [], distance: 5},
  {id: 12, title: "Place 12", imageUrl: "", description: "Description 2", likes: 0, comments: [], distance: 5},
  {id: 13, title: "Place 13", imageUrl: "", description: "Description 2", likes: 0, comments: [], distance: 5},
  {id: 14, title: "Place 14", imageUrl: "", description: "Description 2", likes: 0, comments: [], distance: 5},
  {id: 15, title: "Place 15", imageUrl: "", description: "Description 2", likes: 0, comments: [], distance: 5},
  {id: 16, title: "Place 16", imageUrl: "", description: "Description 2", likes: 0, comments: [], distance: 5},
]

export default function Places() {
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const handleOnReachEnd = () => {
    console.log('End reached triggered')
    places.push({
      id: places.length + 1,
      title: `Place ${places.length + 1}`,
      imageUrl: "", description: "Description 2", likes: 0, comments: [], distance: 5
    })
  }

  const handleOnRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }

  return (
      <View style={styles.container}>
        <FlatList
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleOnRefresh}
                                            tintColor={materialColors.schemes.light.primary}
                                            colors={[materialColors.schemes.light.primary, materialColors.schemes.light.secondary, materialColors.schemes.light.tertiary]}/>}
            keyExtractor={item => item.id.toString()}
            style={{paddingHorizontal: 8, paddingTop: 8}}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => <Text>No places found</Text>}
            onScrollToTop={() => console.log('Scroll to top')}
            onEndReached={handleOnReachEnd}
            onEndReachedThreshold={0.5}
            ItemSeparatorComponent={() => <View style={{height: 16}}/>}
            data={places} renderItem={(data) => <PlaceItem item={data.item}/>}/>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: materialColors.schemes.light.surface,
  }
})