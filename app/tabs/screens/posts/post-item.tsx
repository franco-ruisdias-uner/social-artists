import {View, StyleSheet, Text, Pressable} from "react-native";
import {materialColors} from "@utils/colors";
import {IPost} from "@shared/models";
import {Image} from 'expo-image';
import {sizes} from "@utils/sizes";
import {useState} from "react";

const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

interface Props {
  item: IPost
}

export default function PostItem(props: Props) {
  const {item} = props;

  const [showingMore, setShowingMore] = useState<boolean>(false)


  const getTextBody = (): string => {
    return showingMore ? item.text : `${item.text.slice(0, 100)}...`
  }

  return (
      <View style={styles.container}>
        <View style={styles.userContainer}>
          <View style={styles.profilePicture}></View>
          <Text style={styles.userName}>{`${item.user.nombre} ${item.user.apellido}`}</Text>
        </View>
        <View style={styles.postContainer}>
          <Text style={styles.postBody}>{getTextBody()}</Text>
          <View style={styles.showMoreContainer}>
            <Pressable onPress={() => setShowingMore(!showingMore)}>
              <Text style={styles.showMoreText}>{showingMore ? 'Ver menos' : 'Ver mas'}</Text>
            </Pressable>
          </View>
          {
              item.imageUrl &&
            <Image style={styles.image}
                   placeholder={{blurhash}}
                   contentFit="cover"
                   transition={1000}
                   source={{uri: item.imageUrl}}/>
          }

        </View>
        <View style={styles.likesAndCommentsContainer}>
          <Text style={styles.likesAndCommentsText}>{item.comments.length} comentarios</Text>
          <Text style={styles.likesAndCommentsText}>{item.likes} Me Gusta</Text>
        </View>
        <View style={styles.actionsContainer}>
          <Text>Me Gusta</Text>
          <Text>Comentar</Text>
          <Text>Compartir</Text>
        </View>


      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: materialColors.schemes.light.surface,
  },
  userContainer: {
    flexDirection: 'row',
    paddingHorizontal: sizes.defaultPadding.horizontal,
    paddingVertical: sizes.defaultPadding.vertical,
    gap: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: "#E0E0E0",
  },
  userName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
    color: materialColors.schemes.light.onSurface,
  },
  profilePicture: {
    width: 32,
    height: 32,
    borderRadius: 20,
    backgroundColor: materialColors.schemes.light.primary,
  },
  postContainer: {
    paddingTop: sizes.defaultPadding.vertical,
  },
  postBody: {
    fontSize: 14,
    fontWeight: 300,
    color: materialColors.schemes.light.onSurface,
    paddingHorizontal: sizes.defaultPadding.horizontal,
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: sizes.defaultMargin.vertical,
  },
  likesAndCommentsContainer: {
    paddingHorizontal: sizes.defaultPadding.horizontal,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginVertical: sizes.defaultMargin.vertical
  },
  likesAndCommentsText: {
    fontSize: 14,
    fontWeight: 300,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: sizes.defaultPadding.horizontal,
    paddingVertical: sizes.defaultPadding.vertical,
    borderTopWidth: 0.5,
    borderTopColor: "#E0E0E0",
  },
  showMoreContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: sizes.defaultMargin.vertical,
    paddingHorizontal: sizes.defaultPadding.horizontal,
  },
  showMoreText: {
    fontSize: 12,
    fontWeight: 300,
    color: materialColors.schemes.light.onSurface,
  }
})