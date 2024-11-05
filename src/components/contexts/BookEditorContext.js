import React, { createContext, useContext, useState } from 'react';

const BookEditorContext = createContext();

export const useBookEditor = () => {
    return useContext(BookEditorContext);
};

export const BookEditorProvider = ({ children }) => {
    const [sections, setSections] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    const addSection = () => {
        const newSection = {
            id: Date.now(),
            title: 'Section Title',
            subsections: [],
            content: '',
        };
        setSections(prevSections => [...prevSections, newSection]);
    };

    const addSubsection = (parentId) => {
        const newSubsection = {
            id: Date.now(),
            title: 'Subsection Title',
            content: '',
            subsections: [],
        };

        const addToSection = (sections) => {
            return sections.map(section => {
                if (section.id === parentId) {
                    return { ...section, subsections: [...section.subsections, newSubsection] };
                }
                const updatedSubsections = addToSubsections(section.subsections);
                return { ...section, subsections: updatedSubsections };
            });
        };

        const addToSubsections = (subsections) => {
            return subsections.map(sub => {
                if (sub.id === parentId) {
                    return { ...sub, subsections: [...sub.subsections, newSubsection] };
                }
                const updatedChildSubsections = addToSubsections(sub.subsections);
                return { ...sub, subsections: updatedChildSubsections };
            });
        };

        setSections(prevSections => addToSection(prevSections));
    };

    const updateSectionTitle = (id, title) => {
        setSections(prevSections =>
            prevSections.map(section =>
                section.id === id ? { ...section, title } : section
            )
        );
    };

    const updateSubsectionTitle = (id, title) => {
        const updateTitleRecursively = (subsections) => {
            return subsections.map(sub => {
                if (sub.id === id) {
                    return { ...sub, title };
                }
                return { ...sub, subsections: updateTitleRecursively(sub.subsections) };
            });
        };

        setSections(prevSections =>
            prevSections.map(section => ({
                ...section,
                subsections: updateTitleRecursively(section.subsections),
            }))
        );
    };

    const handleSelect = (id) => {
        setSelectedId(id);
    };

    const handleContentChange = (e) => {
        const newContent = e.target.value;
        setSections(prevSections =>
            prevSections.map(section => {
                if (section.id === selectedId) {
                    return { ...section, content: newContent };
                }
                const updatedSubsections = updateChildSubsections(section.subsections, newContent);
                return { ...section, subsections: updatedSubsections };
            })
        );
    };

    const updateChildSubsections = (subsections, newContent) => {
        return subsections.map(childSub => {
            if (childSub.id === selectedId) {
                return { ...childSub, content: newContent };
            }
            const updatedGrandchildSubsections = updateChildSubsections(childSub.subsections, newContent);
            return { ...childSub, subsections: updatedGrandchildSubsections };
        });
    };

    const currentContent = (id) => {
        const section = sections.find(sec => sec.id === id);
        if (section) {
            return section.content;
        }
        for (const sec of sections) {
            const subsection = sec.subsections.find(sub => sub.id === id);
            if (subsection) {
                return subsection.content;
            }
            const childSubsection = findInSubsections(sec.subsections, id);
            if (childSubsection) {
                return childSubsection.content;
            }
        }
        return '';
    };

    const findInSubsections = (subsections, id) => {
        for (const sub of subsections) {
            if (sub.id === id) {
                return sub;
            }
            const childResult = findInSubsections(sub.subsections, id);
            if (childResult) {
                return childResult;
            }
        }
        return null;
    };

    return (
        <BookEditorContext.Provider value={{
            sections,
            selectedId,
            addSection,
            updateSectionTitle,
            updateSubsectionTitle,
            addSubsection,
            handleSelect,
            handleContentChange,
            currentContent,
        }}>
            {children}
        </BookEditorContext.Provider>
    );
};
