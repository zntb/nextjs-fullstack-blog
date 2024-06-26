'use client';

import Image from 'next/image';
import { toast } from 'react-toastify';
import { useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { app } from '@/utils/firebase';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import styles from './createPost.module.css';
import { useForm } from 'react-hook-form';
import { CreatePostValues, PostSchema, categoryTypes } from '@/schemas/post';
import { zodResolver } from '@hookform/resolvers/zod';
import { createPost } from '@/actions/posts';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { slugify } from '@/lib/utils';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export const CreatePost = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [media, setMedia] = useState('');
  const [error, setError] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<CreatePostValues>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      title: '',
      desc: '',
      img: '',
      catSlug: 'style',
    },
  });

  const { handleSubmit } = form;

  const isQuillValid = (value: string) => {
    const cleanValue = value.replace(/<\/?[^>]+(>|$)/g, '');
    return cleanValue.trim().length >= 3;
  };

  useEffect(() => {
    if (!file) return;
    const storage = getStorage(app);
    const upload = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMedia(downloadURL);
          });
        }
      );
    };

    file && upload();
  }, [file]);

  const onSubmit = async (values: CreatePostValues) => {
    if (!values.title && !values.desc) {
      toast.error('Please enter a title and description');
      return;
    }
    if (values.title.trim().length === 0) {
      toast.error('Please enter a title');
      return;
    }
    if (values.title.trim().length < 3) {
      toast.error('Title must be at least 3 characters long');
      return;
    }
    if (!isQuillValid(values.desc)) {
      toast.error(
        'Description must be at least 3 characters long and not empty'
      );
      return;
    }
    setError('');

    const slug = slugify(values.title);
    const imgValue = values.img || media;
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (key === 'img') {
        formData.append('img', imgValue);
      } else {
        if (value) {
          formData.append(key, value);
        }
      }
    });
    try {
      await createPost(formData);
      toast.success('Post created successfully');
      router.push(`/posts/${slug}`);
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Title"
        className={styles.title}
        {...form.register('title')}
        minLength={3}
        maxLength={100}
      />
      <select className={styles.select} {...form.register('catSlug')}>
        {categoryTypes.map((catType) => (
          <option key={catType} value={catType}>
            {catType === 'style' ? 'style' : catType}
          </option>
        ))}
      </select>
      <div className={styles.editor}>
        <button className={styles.button} onClick={() => setOpen(!open)}>
          <Image src="/plus.png" alt="" width={16} height={16} />
        </button>
        {open && (
          <div className={styles.add}>
            <input
              type="file"
              id="image"
              {...form.register('img')}
              onChange={(e) => setFile(e.target.files![0] || null)}
              style={{ display: 'none' }}
            />
            <button className={styles.addButton}>
              <label htmlFor="image">
                <Image src="/image.png" alt="" width={16} height={16} />
              </label>
            </button>
            <button className={styles.addButton}>
              <Image src="/external.png" alt="" width={16} height={16} />
            </button>
            <button className={styles.addButton}>
              <Image src="/video.png" alt="" width={16} height={16} />
            </button>
          </div>
        )}

        <ReactQuill
          className={styles.textArea}
          placeholder="Tell your story..."
          theme="snow"
          value={form.getValues('desc')}
          onChange={(value) => form.setValue('desc', value)}
        />
      </div>
      <button
        className={styles.publish}
        onClick={() => onSubmit(form.getValues())}
        disabled={isPending}
      >
        Publish
      </button>

      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
};
